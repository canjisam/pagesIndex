// 导入配置
import config from './config.js';

// 初始化页面加载
document.addEventListener('DOMContentLoaded', function() {
    // 显示加载动画
    document.getElementById('repos-list').innerHTML = '<div class="loader"></div>';
    
    // 创建自定义鼠标指针
    createCustomCursor();
    
    // 创建卡片
    createCards();
    
    // 显示GitHub仓库
    displayGitHubRepos();
    
    // 创建星星背景
    createStars();
    
    // 创建流星效果
    createShootingStars();
    
    // 创建波浪效果
    createWaves();
    
    // 添加3D视差效果
    initParallaxEffect();
    
    // 添加页面滚动动画
    initScrollAnimations();
});

// 创建自定义鼠标指针
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 鼠标悬停在链接和按钮上时的效果
        const target = e.target;
        if (target.tagName.toLowerCase() === 'a' || 
            target.tagName.toLowerCase() === 'button' || 
            target.classList.contains('card')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(2)';
            follower.style.background = 'rgba(255, 0, 153, 0.4)';
        } else {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.background = 'rgba(255, 0, 153, 0.2)';
        }
    });
    
    // 鼠标点击效果
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        follower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // 平滑跟随效果
    function updateCursorPosition() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        requestAnimationFrame(updateCursorPosition);
    }
    
    updateCursorPosition();
}

// 创建卡片
// 创建卡片
function createCards() {
    const container = document.getElementById('cards-container');
    
    config.cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'col';
        cardElement.innerHTML = `
            <div class="card h-100" style="border-top: 5px solid ${card.color}; animation-delay: ${index * 0.1}s;">
                <div class="card-body">
                    <div class="flex items-center mb-3">
                        <i class="fas fa-${card.icon} mr-3" style="color: ${card.color}; font-size: 1.8rem;"></i>
                        <h5 class="card-title mb-0">${card.title}</h5>
                    </div>
                    <p class="card-text">${card.description}</p>
                    <a href="${card.link}" class="btn btn-primary mt-2" target="_blank">访问</a>
                </div>
            </div>`;
        
        // 增强的悬停效果
        cardElement.addEventListener('mousemove', (e) => {
            const card = cardElement.querySelector('.card');
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        // 重置卡片位置
        cardElement.addEventListener('mouseleave', () => {
            const card = cardElement.querySelector('.card');
            card.style.transform = 'translateY(0)';
        });
        
        // 添加点击粒子效果 - 减少粒子数量
        cardElement.addEventListener('click', (e) => {
            createParticles(e, cardElement, 10);
        });
        
        container.appendChild(cardElement);
        
        // 添加入场动画
        setTimeout(() => {
            cardElement.style.opacity = '1';
            cardElement.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 显示GitHub仓库
function displayGitHubRepos() {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
    
    if (config.githubRepos && config.githubRepos.length > 0) {
        config.githubRepos.forEach((repo, index) => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';
            repoCard.style.animationDelay = `${index * 0.2}s`;
            repoCard.innerHTML = `
                <h5><i class="fab fa-github mr-2"></i>${repo.name}</h5>
                <p>${repo.description}</p>
                <div class="flex justify-between">
                    <span><i class="fas fa-star mr-1"></i>${repo.stars}</span>
                    <span><i class="fas fa-code-branch mr-1"></i>${repo.forks}</span>
                </div>
                <a href="${repo.url}" class="btn btn-sm btn-outline-primary mt-2" target="_blank">查看仓库</a>
            `;
            
            // 添加悬停效果
            repoCard.addEventListener('mousemove', (e) => {
                const rect = repoCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                repoCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            
            // 重置位置
            repoCard.addEventListener('mouseleave', () => {
                repoCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
            
            reposList.appendChild(repoCard);
        });
    } else {
        reposList.innerHTML = '<p>暂无GitHub仓库信息</p>';
    }
}

// 创建粒子效果 - 优化版
function createParticles(e, element, count) {
    // 全局粒子数量限制 - 减少最大粒子数
    const maxParticles = 30;
    
    const currentParticles = document.querySelectorAll('.particle').length;
    
    // 如果当前粒子数量已经达到最大值，则不再创建新粒子
    if (currentParticles >= maxParticles) {
        count = Math.min(count, maxParticles - currentParticles);
        if (count <= 0) return;
    }
    
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 简化粒子样式
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机粒子方向 - 减小范围
        particle.style.setProperty('--x', `${(Math.random() - 0.5) * 100}px`);
        particle.style.setProperty('--y', `${(Math.random() - 0.5) * 100}px`);
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        element.appendChild(particle);
        
        // 减少粒子存在时间
        setTimeout(() => {
            particle.remove();
        }, 600);
    }
}

// 创建星星背景 - 减少星星数量
function createStars() {
    const body = document.querySelector('body');
    const starCount = 50; // 减少星星数量
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        // 随机星星大小
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机星星亮度
        const brightness = Math.random() * 0.5 + 0.5;
        star.style.opacity = brightness;
        
        body.appendChild(star);
    }
}

// 创建流星效果 - 减少流星数量和频率
function createShootingStars() {
    const body = document.querySelector('body');
    const shootingStarCount = 3; // 减少流星数量
    
    for (let i = 0; i < shootingStarCount; i++) {
        setTimeout(() => {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            // 随机位置和方向
            shootingStar.style.left = `${Math.random() * 100}%`;
            shootingStar.style.top = `${Math.random() * 50}%`;
            shootingStar.style.setProperty('--direction-x', Math.random() > 0.5 ? 1 : -1);
            shootingStar.style.setProperty('--direction-y', Math.random() > 0.5 ? 1 : -1);
            
            body.appendChild(shootingStar);
            
            // 动画结束后移除
            setTimeout(() => {
                shootingStar.remove();
                // 创建新的流星 - 增加间隔时间
                setTimeout(() => {
                    createShootingStars();
                }, 5000);
            }, 3000);
        }, i * 5000); // 增加流星间隔
    }
}

// 创建波浪效果
function createWaves() {
    const container = document.querySelector('.container');
    const wave = document.createElement('div');
    wave.className = 'wave';
    container.appendChild(wave);
}

// 初始化视差效果 - 简化版
function initParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // 移动标题 - 减小移动幅度
        const title = document.querySelector('h1');
        if (title) {
            title.style.transform = `translateX(${x * 10 - 5}px) translateY(${y * 10 - 5}px)`;
        }
        
        // 移动星星 - 减少计算量，只移动部分星星
        const stars = document.querySelectorAll('.star');
        const starsToMove = Math.min(stars.length, 20); // 限制移动的星星数量
        
        for (let i = 0; i < starsToMove; i++) {
            const star = stars[i];
            const speed = parseFloat(star.getAttribute('data-speed') || Math.random() * 0.05);
            star.style.transform = `translateX(${x * 20 * speed}px) translateY(${y * 20 * speed}px)`;
        }
    });
}

// 初始化滚动动画
// 初始化滚动动画
function initScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    const repos = document.querySelectorAll('.repo-card');
    
    // 初始化卡片状态
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    repos.forEach((repo, index) => {
        repo.style.opacity = '0';
        repo.style.transform = 'translateY(50px)';
        repo.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // 滚动时显示元素
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        repos.forEach(repo => {
            const repoTop = repo.getBoundingClientRect().top;
            if (repoTop < triggerBottom) {
                repo.style.opacity = '1';
                repo.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);
}