-- Insert categories
INSERT INTO categories (name, description, icon) VALUES
('World', 'Global news and events', '🌍'),
('Technology', 'Latest in tech and innovation', '💻'),
('Business', 'Business and finance news', '💼'),
('Entertainment', 'Movies, music, and culture', '🎬'),
('Sports', 'Sports news and updates', '⚽'),
('Science', 'Scientific discoveries and research', '🔬'),
('Health', 'Health and wellness news', '⚕️');

-- Insert authors
INSERT INTO authors (name, bio, profile_image_url) VALUES
('John Smith', 'Senior Technology Reporter', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'),
('Sarah Johnson', 'Business Analyst', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'),
('Mike Wilson', 'Sports Editor', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'),
('Alex Brown', 'Entertainment Writer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'),
('Emma Davis', 'Science Correspondent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'),
('James Wilson', 'Health Reporter', 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'),
('Lisa Chen', 'World News Correspondent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa');

-- Store category IDs in variables to avoid multiple rows issue
DO $$
DECLARE
    world_id UUID;
    tech_id UUID;
    business_id UUID;
    entertainment_id UUID;
    sports_id UUID;
    lisa_id UUID;
    john_id UUID;
    sarah_id UUID;
    alex_id UUID;
    mike_id UUID;
BEGIN
    SELECT id INTO world_id FROM categories WHERE name = 'World' LIMIT 1;
    SELECT id INTO tech_id FROM categories WHERE name = 'Technology' LIMIT 1;
    SELECT id INTO business_id FROM categories WHERE name = 'Business' LIMIT 1;
    SELECT id INTO entertainment_id FROM categories WHERE name = 'Entertainment' LIMIT 1;
    SELECT id INTO sports_id FROM categories WHERE name = 'Sports' LIMIT 1;
    
    SELECT id INTO lisa_id FROM authors WHERE name = 'Lisa Chen' LIMIT 1;
    SELECT id INTO john_id FROM authors WHERE name = 'John Smith' LIMIT 1;
    SELECT id INTO sarah_id FROM authors WHERE name = 'Sarah Johnson' LIMIT 1;
    SELECT id INTO alex_id FROM authors WHERE name = 'Alex Brown' LIMIT 1;
    SELECT id INTO mike_id FROM authors WHERE name = 'Mike Wilson' LIMIT 1;

    -- World News Posts
    INSERT INTO posts (title, content, excerpt, image_url, category_id, author_id, is_featured, is_editors_pick, is_must_read, published_at) VALUES
    ('Global Climate Summit Reaches Historic Agreement', 'Full article content...', 'World leaders agree on ambitious climate goals', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09', world_id, lisa_id, true, false, true, NOW()),
    ('Peace Talks Progress in Middle East', 'Full article content...', 'Historic breakthrough in negotiations', 'https://images.unsplash.com/photo-1447727214830-cbcbf097b52c', world_id, lisa_id, false, true, false, NOW() - INTERVAL '1 day'),
    ('New Trade Deal Between Major Economies', 'Full article content...', 'Economic cooperation reaches new heights', 'https://images.unsplash.com/photo-1516245834210-c4c142787335', world_id, lisa_id, false, false, true, NOW() - INTERVAL '2 days'),
    ('Humanitarian Crisis Response Launched', 'Full article content...', 'International aid mobilized', 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b', world_id, lisa_id, false, true, false, NOW() - INTERVAL '3 days'),
    ('UN Assembly Addresses Global Challenges', 'Full article content...', 'World leaders gather for annual meeting', 'https://images.unsplash.com/photo-1526470498-9ae73c665de8', world_id, lisa_id, false, false, true, NOW() - INTERVAL '4 days');

    -- Technology Posts
    INSERT INTO posts (title, content, excerpt, image_url, category_id, author_id, is_featured, is_editors_pick, is_must_read, published_at) VALUES
    ('Revolutionary AI Breakthrough Announced', 'Full article content...', 'New AI model surpasses human performance', 'https://images.unsplash.com/photo-1677442136019-21780ecad995', tech_id, john_id, false, true, true, NOW()),
    ('Apple Unveils Next-Generation iPhone', 'Full article content...', 'Latest iPhone features groundbreaking technology', 'https://images.unsplash.com/photo-1556656793-08538906a9f8', tech_id, john_id, true, false, false, NOW() - INTERVAL '1 day'),
    ('Electric Vehicle Revolution Accelerates', 'Full article content...', 'Major automakers commit to electric future', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7', tech_id, john_id, false, true, false, NOW() - INTERVAL '2 days'),
    ('Quantum Computing Milestone Achieved', 'Full article content...', 'Scientists reach quantum supremacy', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb', tech_id, john_id, false, false, true, NOW() - INTERVAL '3 days'),
    ('5G Networks Transform Cities', 'Full article content...', 'Smart city initiatives take off', 'https://images.unsplash.com/photo-1478432780021-b8d273730d8c', tech_id, john_id, false, true, false, NOW() - INTERVAL '4 days');

    -- Business Posts
    INSERT INTO posts (title, content, excerpt, image_url, category_id, author_id, is_featured, is_editors_pick, is_must_read, published_at) VALUES
    ('Global Markets Hit Record High', 'Full article content...', 'Stock markets surge worldwide', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3', business_id, sarah_id, true, true, false, NOW()),
    ('Tech Startup Reaches Unicorn Status', 'Full article content...', 'Revolutionary platform valued at $1B', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd', business_id, sarah_id, false, false, true, NOW() - INTERVAL '1 day'),
    ('Renewable Energy Investment Soars', 'Full article content...', 'Green energy sector sees record growth', 'https://images.unsplash.com/photo-1466611653911-95081537e5b7', business_id, sarah_id, false, true, false, NOW() - INTERVAL '2 days'),
    ('Cryptocurrency Market Analysis', 'Full article content...', 'Bitcoin reaches new milestones', 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d', business_id, sarah_id, false, false, true, NOW() - INTERVAL '3 days'),
    ('Retail Giants Merge in Historic Deal', 'Full article content...', 'Industry-changing acquisition announced', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da', business_id, sarah_id, false, true, false, NOW() - INTERVAL '4 days');

    -- Entertainment Posts
    INSERT INTO posts (title, content, excerpt, image_url, category_id, author_id, is_featured, is_editors_pick, is_must_read, published_at) VALUES
    ('Blockbuster Movie Breaks Records', 'Full article content...', 'New release shatters box office records', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1', entertainment_id, alex_id, true, false, true, NOW()),
    ('Music Industry Awards Ceremony', 'Full article content...', 'Stars gather for annual celebration', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', entertainment_id, alex_id, false, true, false, NOW() - INTERVAL '1 day'),
    ('Streaming Platform Launches Original Series', 'Full article content...', 'Highly anticipated show premieres', 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37', entertainment_id, alex_id, false, false, true, NOW() - INTERVAL '2 days'),
    ('Celebrity Wedding Makes Headlines', 'Full article content...', 'Star-studded ceremony dazzles fans', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8', entertainment_id, alex_id, false, true, false, NOW() - INTERVAL '3 days'),
    ('Gaming Industry Revolution', 'Full article content...', 'Next-gen consoles transform gaming', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', entertainment_id, alex_id, false, false, true, NOW() - INTERVAL '4 days');

    -- Sports Posts
    INSERT INTO posts (title, content, excerpt, image_url, category_id, author_id, is_featured, is_editors_pick, is_must_read, published_at) VALUES
    ('Champions League Final Drama', 'Full article content...', 'Historic match ends in thriller', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2', sports_id, mike_id, true, true, false, NOW()),
    ('Olympic Records Shattered', 'Full article content...', 'Athletes achieve new milestones', 'https://images.unsplash.com/photo-1541744573515-478c959628a0', sports_id, mike_id, false, false, true, NOW() - INTERVAL '1 day'),
    ('Formula 1 Championship Battle', 'Full article content...', 'Intense racing season continues', 'https://images.unsplash.com/photo-1552849397-7a2d7864a9b4', sports_id, mike_id, false, true, false, NOW() - INTERVAL '2 days'),
    ('Tennis Grand Slam Update', 'Full article content...', 'Major tournament reaches climax', 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653', sports_id, mike_id, false, false, true, NOW() - INTERVAL '3 days'),
    ('Basketball League Expansion', 'Full article content...', 'New teams join professional league', 'https://images.unsplash.com/photo-1546519638-68e109498ffc', sports_id, mike_id, false, true, false, NOW() - INTERVAL '4 days');
END $$;