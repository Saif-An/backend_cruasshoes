-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  layanan_id INT NOT NULL,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telepon VARCHAR(20) NOT NULL,
  alamat TEXT NOT NULL,
  tanggal DATE NOT NULL,
  catatan TEXT,
  status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (layanan_id) REFERENCES layanan(id) ON DELETE CASCADE
);

-- Insert sample data (optional)
INSERT INTO orders (layanan_id, nama, email, telepon, alamat, tanggal, catatan, status) VALUES
(1, 'John Doe', 'john@example.com', '08123456789', 'Jl. Contoh No. 123', '2024-01-20', 'Tolong cepat ya', 'pending'),
(2, 'Jane Smith', 'jane@example.com', '08198765432', 'Jl. Sample No. 456', '2024-01-22', 'Ada diskon?', 'confirmed');