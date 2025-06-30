import React, { useEffect, useState } from 'react';

type Template = { id: string; title: string; content: string };

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => setTemplates(data.templates || []))
      .catch(() => setError('Gagal mengambil data'));
  }, []);

  return (
    <div style={{maxWidth:500, margin:"0 auto", padding:24}}>
      <h2>Template & Ide Konten Viral</h2>
      {error && <div style={{color:"red"}}>{error}</div>}
      <ul>
        {templates.map(tpl => (
          <li key={tpl.id} style={{marginBottom:12}}>
            <b>{tpl.title}</b>
            <p>{tpl.content}</p>
            {/* Tombol gunakan template (implementasi sesuai kebutuhan) */}
            <button onClick={() => navigator.clipboard.writeText(tpl.content)}>Salin & Pakai</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplatesPage;
