-- You've already run: CREATE DATABASE bd_bible;
-- Now run these commands:

-- Create user with password
CREATE USER bd_bible_user WITH ENCRYPTED PASSWORD 'your_secure_password_here';

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE bd_bible TO bd_bible_user;

-- Make user owner of database
ALTER DATABASE bd_bible OWNER TO bd_bible_user;

-- Connect to bd_bible database
\c bd_bible;

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO bd_bible_user;

-- Exit PostgreSQL
\q