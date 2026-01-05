-- Sample data for testing the MySQL database

-- Insert sample users (replace hashed passwords with real bcrypt hashes from your app)
INSERT INTO Users (name, email, phone, password, role) VALUES
('John Provider', 'provider@example.com', '555-0001', '$2a$10$...hashed_password...', 'provider'),
('Jane Customer', 'customer@example.com', '555-0002', '$2a$10$...hashed_password...', 'customer'),
('Admin User', 'admin@example.com', '555-0003', '$2a$10$...hashed_password...', 'admin');

-- Insert sample services (replace providerId with real provider user id)
INSERT INTO Services (name, description, providerId, price, duration, category, isActive) VALUES
('Haircut', 'Professional haircut service', 1, 25.00, 30, 'Hair', TRUE),
('Massage Therapy', 'Relaxing full body massage', 1, 60.00, 60, 'Wellness', TRUE),
('Dental Cleaning', 'Professional dental cleaning', 1, 100.00, 45, 'Dental', TRUE),
('Yoga Session', 'One hour yoga class', 1, 40.00, 60, 'Fitness', TRUE);

-- Insert sample appointments (replace IDs with actual IDs)
INSERT INTO Appointments (customerId, providerId, serviceId, date, startTime, endTime, status, notes, reminderSent) VALUES
(2, 1, 1, '2024-01-15', '14:00', '14:30', 'confirmed', 'Please come 10 minutes early', FALSE),
(2, 1, 2, '2024-01-20', '10:00', '11:00', 'pending', 'First time client', FALSE),
(2, 1, 3, '2024-01-25', '15:30', '16:15', 'confirmed', 'Sensitive teeth', FALSE);

-- View all users
SELECT * FROM Users;

-- View all services for a provider
SELECT * FROM Services WHERE providerId = 1 AND isActive = TRUE;

-- View all appointments
SELECT 
  a.id,
  u1.name AS customer_name,
  u2.name AS provider_name,
  s.name AS service_name,
  a.date,
  a.startTime,
  a.endTime,
  a.status
FROM Appointments a
JOIN Users u1 ON a.customerId = u1.id
JOIN Users u2 ON a.providerId = u2.id
JOIN Services s ON a.serviceId = s.id
ORDER BY a.date DESC;
