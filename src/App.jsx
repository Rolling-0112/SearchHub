import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import PlatformSelector from './components/PlatformSelector'
import { platforms, search } from './utils/searchRoutes'
import { db } from './firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [userId, setUserId] = useState(localStorage.getItem('searchhub_uid'))

  useEffect(() => {
    // Popup Blocker Detection
    // This part logic is usually triggered by user action, so we keep the alert function ready
  }, []);

  useEffect(() => {
    if (!userId) {
      const newId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      setUserId(newId);
      localStorage.setItem('searchhub_uid', newId);
    } else {
      // Load preferences
      const loadPrefs = async () => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.selectedPlatforms) setSelectedPlatforms(data.selectedPlatforms);
          }
        } catch (e) {
          console.error("Error loading prefs:", e);
        }
      };
      loadPrefs();
    }
  }, [userId]);

  const togglePlatform = (id) => {
    const newSelection = selectedPlatforms.includes(id)
      ? selectedPlatforms.filter(pid => pid !== id)
      : [...selectedPlatforms, id];
    
    setSelectedPlatforms(newSelection);
    
    // Save to Firebase
    if (userId) {
      setDoc(doc(db, "users", userId), { 
        selectedPlatforms: newSelection,
        lastActive: new Date()
      }, { merge: true });
    }
  }

  const handleSearch = () => {
    if (!query) return;
    
    // Save history
    if (userId) {
        setDoc(doc(db, "users", userId), {
            searchHistory: {[Date.now()]: query}
        }, { merge: true });
    }

    let blockedCount = 0;
    
    // Execute Search with Popup Detection
    selectedPlatforms.forEach(id => {
      const platform = platforms.find(p => p.id === id);
      if (platform) {
        const targetUrl = platform.url.replace('{query}', encodeURIComponent(query));
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
    <div className="app-container">
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      <div className="glass-card">
        <h1 className="title">SearchHub</h1>
        <p className="subtitle">全网聚合 · 一键直达</p>
        
        <SearchBar 
          value={query} 
          onChange={setQuery} 
          onSearch={handleSearch} 
        />
        
        <PlatformSelector 
          selected={selectedPlatforms} 
          toggle={togglePlatform} 
        />
        
        <div className="hint">
          {selectedPlatforms.length > 0 
            ? `已选择 ${selectedPlatforms.length} 个平台，将为您打开 ${selectedPlatforms.length} 个标签页`
            : '请选择至少一个平台开始搜索'}
        </div>
      </div>
    </div>
  )
}

export default App
