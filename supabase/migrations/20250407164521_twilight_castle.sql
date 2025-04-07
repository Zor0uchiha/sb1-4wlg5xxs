/*
  # Initial Schema Setup

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `completed` (boolean)
      - `due_date` (timestamptz)
      - `type` (text)
      - `streak` (integer)
      - `credits` (integer)
      - `created_at` (timestamptz)

    - `achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `icon` (text)
      - `progress` (integer)
      - `total` (integer)
      - `completed` (boolean)
      - `unlocked_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  completed boolean DEFAULT false,
  due_date timestamptz NOT NULL,
  type text CHECK (type IN ('daily', 'weekly', 'custom')) NOT NULL,
  streak integer DEFAULT 0,
  credits integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  progress integer DEFAULT 0,
  total integer NOT NULL,
  completed boolean DEFAULT false,
  unlocked_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks
CREATE POLICY "Users can manage their own tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for achievements
CREATE POLICY "Users can manage their own achievements"
  ON achievements
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_achievements_updated_at
  BEFORE UPDATE ON achievements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();