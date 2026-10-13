import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user dari localStorage setelah login berhasil
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
    } else {
      const user = JSON.parse(userStr);
      setRole(user.role);
    }
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard TerasTani</h1>
      {role === 'user' ? (
        <div>
          <h2>Selamat Datang, Petani!</h2>
          <p>Mulai kalkulasi lahan dan jadwal tanam Anda di sini.</p>
        </div>
      ) : (
        <div>
          <h2>Selamat Datang, Distributor!</h2>
          <p>Pantau hasil panen warga yang siap didistribusikan.</p>
        </div>
      )}
    </div>
  );
}