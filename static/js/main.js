// 검색 기능
let searchIndex = [];

// 검색 인덱스 생성
function buildSearchIndex() {
    const pages = document.querySelectorAll('article, .doc-single, .post-single');
    searchIndex = [];
    
    // 모든 페이지의 제목과 내용을 인덱스에 추가
    // 실제로는 Hugo에서 JSON으로 생성하거나, 모든 페이지를 로드해야 함
    // 간단한 클라이언트 사이드 검색을 위해 현재 페이지의 내용만 사용
}

// 검색 실행
function performSearch(query) {
    if (!query || query.length < 2) {
        return [];
    }
    
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    // 사이드바 메뉴에서 검색
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(function(item) {
        const text = item.textContent.toLowerCase();
        if (text.includes(lowerQuery)) {
            results.push({
                title: item.textContent.trim(),
                url: item.getAttribute('href'),
                type: 'menu'
            });
        }
    });
    
    return results;
}

// 검색 결과 표시
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item">검색 결과가 없습니다.</div>';
        resultsContainer.style.display = 'block';
        return;
    }
    
    resultsContainer.innerHTML = results.map(function(result) {
        return `<a href="${result.url}" class="search-result-item">
            <div class="search-result-title">${result.title}</div>
            <div class="search-result-type">${result.type === 'menu' ? '메뉴' : '문서'}</div>
        </a>`;
    }).join('');
    
    resultsContainer.style.display = 'block';
}

// 검색 입력 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();
            if (query.length >= 2) {
                const results = performSearch(query);
                displaySearchResults(results);
            } else {
                if (searchResults) {
                    searchResults.style.display = 'none';
                }
            }
        });
        
        // 검색창 외부 클릭 시 결과 숨기기
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-box')) {
                if (searchResults) {
                    searchResults.style.display = 'none';
                }
            }
        });
        
        // ESC 키로 검색 결과 닫기
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (searchResults) {
                    searchResults.style.display = 'none';
                }
                searchInput.blur();
            }
        });
    }
});

// 코드 블록 복사 버튼 추가
(function() {
    // 이미 실행되었는지 확인
    if (window.copyButtonsInitialized) {
        return;
    }
    window.copyButtonsInitialized = true;
    
    function initCopyButtons() {
        // Prism.js가 추가한 복사 버튼 제거
        document.querySelectorAll('.copy-to-clipboard-button, button[data-copy-state], div[class*="copy-to-clipboard"]').forEach(function(btn) {
            btn.remove();
        });
        
        // 모든 pre 태그에 복사 버튼 추가
        const preBlocks = document.querySelectorAll('pre:not(:has(.copy-button))');
        
        preBlocks.forEach(function(pre) {
            // 이미 복사 버튼이 있으면 스킵
            if (pre.querySelector('.copy-button')) {
                return;
            }
            
            const codeBlock = pre.querySelector('code');
            if (!codeBlock) return;
            
            // Prism.js가 추가한 버튼이 있으면 제거
            const prismButtons = pre.querySelectorAll('.copy-to-clipboard-button, button[data-copy-state]');
            prismButtons.forEach(function(btn) {
                btn.remove();
            });
            
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '<i class="mdi mdi-content-copy"></i>';
            copyButton.setAttribute('aria-label', '코드 복사');
            copyButton.setAttribute('title', '코드 복사');
            
            copyButton.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                const text = codeBlock.textContent;
                navigator.clipboard.writeText(text).then(function() {
                    copyButton.innerHTML = '<i class="mdi mdi-check"></i>';
                    copyButton.classList.add('copied');
                    setTimeout(function() {
                        copyButton.innerHTML = '<i class="mdi mdi-content-copy"></i>';
                        copyButton.classList.remove('copied');
                    }, 2000);
                }).catch(function(err) {
                    console.error('복사 실패:', err);
                });
            });
            
            pre.style.position = 'relative';
            pre.appendChild(copyButton);
        });
    }
    
    // DOMContentLoaded 이벤트 리스너
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCopyButtons);
    } else {
        initCopyButtons();
    }
    
    // Hugo live reload 대응
    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', initCopyButtons);
    }
})();

// 헤딩에 앵커 링크 추가
(function() {
    if (window.headingAnchorsInitialized) {
        return;
    }
    window.headingAnchorsInitialized = true;
    
    function initHeadingAnchors() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(function(heading) {
            if (heading.id && !heading.querySelector('.heading-anchor')) {
                const anchor = document.createElement('a');
                anchor.className = 'heading-anchor';
                anchor.href = '#' + heading.id;
                anchor.innerHTML = '<i class="mdi mdi-link"></i>';
                anchor.setAttribute('aria-label', '링크 복사');
                heading.style.position = 'relative';
                heading.appendChild(anchor);
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeadingAnchors);
    } else {
        initHeadingAnchors();
    }
})();

// 목차 링크 클릭 시 부드러운 스크롤
document.addEventListener('DOMContentLoaded', function() {
    const tocLinks = document.querySelectorAll('.toc-content a');
    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // URL 업데이트
                    window.history.pushState(null, null, href);
                }
            }
        });
    });
    
    // 스크롤 시 목차 하이라이트
    if (document.querySelector('.toc-content')) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const tocLink = document.querySelector('.toc-content a[href="#' + id + '"]');
                    if (tocLink) {
                        // 모든 링크에서 active 제거
                        document.querySelectorAll('.toc-content a').forEach(function(link) {
                            link.classList.remove('active');
                        });
                        // 현재 링크에 active 추가
                        tocLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);
        
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(function(heading) {
            if (heading.id) {
                observer.observe(heading);
            }
        });
    }
});

