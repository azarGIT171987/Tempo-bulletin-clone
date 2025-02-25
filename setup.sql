-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES authors(id),
  is_featured BOOLEAN DEFAULT false,
  is_editors_pick BOOLEAN DEFAULT false,
  is_must_read BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_featured ON posts(is_featured) WHERE is_featured = true;
CREATE INDEX idx_posts_editors_pick ON posts(is_editors_pick) WHERE is_editors_pick = true;
CREATE INDEX idx_posts_must_read ON posts(is_must_read) WHERE is_must_read = true;

-- Insert sample data
INSERT INTO categories (name, description, icon) VALUES
('World', 'Global news and events', '🌍'),
('Technology', 'Latest in tech and innovation', '💻'),
('Business', 'Business and finance news', '💼'),
('Entertainment', 'Movies, music, and culture', '🎬'),
('Sports', 'Sports news and updates', '⚽'),
('Science', 'Scientific discoveries and research', '🔬'),
('Health', 'Health and wellness news', '⚕️');

INSERT INTO authors (name, bio, profile_image_url) VALUES
('John Smith', 'Senior Technology Reporter', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'),
('Sarah Johnson', 'Business Analyst', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'),
('Mike Wilson', 'Sports Editor', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'),
('Alex Brown', 'Entertainment Writer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex');

-- Insert sample posts
INSERT INTO posts (
  title, 
  content, 
  excerpt, 
  image_url, 
  category_id, 
  author_id, 
  is_featured, 
  is_editors_pick, 
  is_must_read
) VALUES
(
  'Where To Watch John Wick: Chapter 4',
  'Full article content here about John Wick 4...',
  'The latest installment of the action franchise...',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&h=800&fit=crop',
  (SELECT id FROM categories WHERE name = 'Entertainment'),
  (SELECT id FROM authors WHERE name = 'Alex Brown'),
  true,
  false,
  false
),
(
  'He deserves a lot more: Verstappen backs Ricciardo',
  'Full article content about Formula 1...',
  'Formula 1 champion speaks out...',
  'https://images.unsplash.com/photo-1541744573515-478c959628a0?w=800&h=600&fit=crop',
  (SELECT id FROM categories WHERE name = 'Sports'),
  (SELECT id FROM authors WHERE name = 'Mike Wilson'),
  false,
  true,
  false
),
(
  'All the rumors about the iPhone 15',
  'Full article content about iPhone 15...',
  'From its processor to its charging port...',
  'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=800&fit=crop',
  (SELECT id FROM categories WHERE name = 'Technology'),
  (SELECT id FROM authors WHERE name = 'John Smith'),
  false,
  true,
  true
),
(
  'Fresh producers turn to next winter crops',
  'Full article content about agriculture...',
  'Agricultural trends shift...',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
  (SELECT id FROM categories WHERE name = 'Business'),
  (SELECT id FROM authors WHERE name = 'Sarah Johnson'),
  false,
  false,
  true
);