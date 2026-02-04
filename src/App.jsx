import React, { useState } from 'react';
import PlatformSelector from './components/PlatformSelector';
import SearchBar from './components/SearchBar';
import { search, platforms } from './utils/searchRoutes';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import './App.css';

const USER_ID = 'demo-user-001';

function App() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['xiaohongshu']);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Theme Init Logic
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme !== 'light';
    setIsDarkMode(isDark);
    
    // Apply to Body
    if (!isDark) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    // Apply to Body
    if (!newMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  /* Firebase Sync Logic */
  React.useEffect(() => {
    const syncData = async () => {
      try {
        const docRef = doc(db, "users", USER_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.preferences) setSelectedPlatforms(data.preferences);
        }
      } catch (e) {
        console.log("Firebase not connected yet (Config missing)");
      }
    };
    syncData();
  }, []);

  const togglePlatform = (id) => {
    let newPlatforms;
    if (selectedPlatforms.includes(id)) {
      newPlatforms = selectedPlatforms.filter(p => p !== id);
    } else {
      newPlatforms = [...selectedPlatforms, id];
    }
    setSelectedPlatforms(newPlatforms);

    // Save to Cloud
    try {
      setDoc(doc(db, "users", USER_ID), { preferences: newPlatforms }, { merge: true });
    } catch (e) { /* Ignore if config missing */ }
  };

  const onSearch = (query) => {
    if (selectedPlatforms.length === 0) {
      alert('请至少选择一个平台 😅');
      return;
    }

    let blockedCount = 0;

    // Save History to Cloud
    try {
      setDoc(doc(db, "users", USER_ID), {
        history: arrayUnion(query),
        last_updated: new Date()
      }, { merge: true });
    } catch (e) { /* Ignore */ }

    // Execute Search with Popup Detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

    selectedPlatforms.forEach(id => {
      const platform = platforms.find(p => p.id === id);
      if (platform) {
        let targetUrl = platform.url.replace('{query}', encodeURIComponent(query));

        // BUG FIX: Apply Mobile Fallback Logic HERE
        if (isMobile) {
          // Xiaohongshu Deep Link
          if (id === 'xiaohongshu') {
            window.location.href = `xhsdiscover://search/result?keyword=${encodeURIComponent(query)}`;
            return;
          }
          // Bilibili Deep Link
          if (id === 'bilibili') {
            window.location.href = `bilibili://search?keyword=${encodeURIComponent(query)}`;
            return;
          }
        }

        // First one usually succeeds (initiated by user action), others might be blocked
        const newWin = window.open(targetUrl, '_blank');
        if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
          blockedCount++;
        }
      }
    });

    if (blockedCount > 0) {
      alert(`⚠️ 浏览器拦截了 ${blockedCount} 个窗口！\n\n为了同时打开多个平台，请在浏览器地址栏右侧点击“拦截图标”，并选择“始终允许”此网站。`);
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? '' : 'light-mode'}`}>
      <button className="theme-toggle" onClick={toggleTheme} title="切换主题">
        {isDarkMode ? '🌙' : '☀️'}
      </button>

      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="glass-card">
        <h1 className="title">SearchHub</h1>
        <p className="subtitle">全网聚合 · 一键直达</p>

        <SearchBar onSearch={onSearch} />

        <div className="selector-wrapper">
          <PlatformSelector selected={selectedPlatforms} toggle={togglePlatform} />
        </div>

        <p className="hint">
          {selectedPlatforms.length > 0
            ? `已选择 ${selectedPlatforms.length} 个平台，将为您打开 ${selectedPlatforms.length} 个标签页`
            : '请选择平台以开始搜索'}
        </p>
      </div>
    </div>
  );
}

export default App;
