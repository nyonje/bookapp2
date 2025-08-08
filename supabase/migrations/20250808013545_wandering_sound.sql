/*
  # Create subscription system

  1. New Tables
    - `subscription_tiers`
      - `id` (text, primary key)
      - `name` (text)
      - `price` (decimal)
      - `features` (jsonb)
      - `created_at` (timestamp)
    - `user_subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `tier_id` (text, foreign key to subscription_tiers)
      - `status` (text)
      - `current_period_start` (timestamp)
      - `current_period_end` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to read their own subscriptions
    - Add policies for admins to manage all subscriptions

  3. Admin Setup
    - Set onnyonje@gmail.com as admin in profiles table
*/

-- Create subscription tiers table
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id text PRIMARY KEY,
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create user subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier_id text NOT NULL REFERENCES subscription_tiers(id),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz DEFAULT (now() + interval '1 month'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add admin role to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role text DEFAULT 'user' CHECK (role IN ('user', 'admin'));
  END IF;
END $$;

-- Enable RLS
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_tiers (readable by all authenticated users)
CREATE POLICY "Anyone can view subscription tiers"
  ON subscription_tiers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON user_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON user_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON user_subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin policies
CREATE POLICY "Admins can manage all subscriptions"
  ON user_subscriptions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_tier_id ON user_subscriptions(tier_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);

-- Add updated_at trigger
CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON user_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert subscription tiers
INSERT INTO subscription_tiers (id, name, price, description, features) VALUES
  ('free', 'Free', 0.00, 'Access to Chapter 1 only', '["chapter_1"]'::jsonb),
  ('pro', 'Pro', 29.00, 'Access to all chapters and community', '["all_chapters", "community", "progress_tracking", "quizzes"]'::jsonb),
  ('premium', 'Premium', 99.00, 'Full access to all features', '["all_chapters", "community", "progress_tracking", "quizzes", "tools", "build_app", "search", "analytics", "marketing_vault"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  features = EXCLUDED.features;

-- Set admin role for onnyonje@gmail.com
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'onnyonje@gmail.com';

-- Create default free subscriptions for existing users
INSERT INTO user_subscriptions (user_id, tier_id, status)
SELECT id, 'free', 'active'
FROM profiles
WHERE id NOT IN (SELECT user_id FROM user_subscriptions)
ON CONFLICT DO NOTHING;