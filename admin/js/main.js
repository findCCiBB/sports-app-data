class DataManager {
    constructor() {
        this.currentSection = null;
        this.initializeEventListeners();
        this.loadInitialData();
    }

    initializeEventListeners() {
        window.addEventListener('hashchange', () => this.handleRouteChange());
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = e.target.getAttribute('href');
            });
        });
    }

    async loadInitialData() {
        const hash = window.location.hash || '#venues';
        await this.handleRouteChange();
    }

    async handleRouteChange() {
        const hash = window.location.hash || '#venues';
        const contentDiv = document.getElementById('content');
        
        switch (hash) {
            case '#venues':
                await this.loadVenuesManager();
                break;
            case '#sports-data':
                await this.loadSportsDataManager();
                break;
            case '#news':
                await this.loadNewsManager();
                break;
        }
    }

    async loadVenuesManager() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <h2>球场管理</h2>
            <div class="form-group">
                <button id="addVenue" class="btn">添加新球场</button>
                <div id="venuesList"></div>
            </div>
        `;
        
        document.getElementById('addVenue').addEventListener('click', () => {
            this.showAddVenueForm();
        });
        
        await this.loadVenues();
    }

    async loadVenues() {
        try {
            const response = await fetch('../data/venues.json');
            const data = await response.json();
            this.displayVenues(data.venues);
        } catch (error) {
            console.error('Error loading venues:', error);
        }
    }

    displayVenues(venues) {
        const venuesList = document.getElementById('venuesList');
        venuesList.innerHTML = venues.map(venue => `
            <div class="venue-item">
                <h3>${venue.name}</h3>
                <p>${venue.district}</p>
                <button class="btn" onclick="dataManager.editVenue('${venue.id}')">编辑</button>
                <button class="btn" onclick="dataManager.deleteVenue('${venue.id}')">删除</button>
            </div>
        `).join('');
    }

    showAddVenueForm() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <h2>添加新球场</h2>
            <form id="venueForm" class="form-group">
                <label>名称：<input type="text" name="name" required></label>
                <label>区域：<input type="text" name="district" required></label>
                <label>地址：<input type="text" name="address" required></label>
                <label>电话：<input type="text" name="phone" required></label>
                <label>营业时间：<input type="text" name="businessHours" required></label>
                <label>是否免费：<input type="checkbox" name="isFree"></label>
                <label>价格：<input type="text" name="price"></label>
                <button type="submit" class="btn">保存</button>
            </form>
        `;

        document.getElementById('venueForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveVenue(new FormData(e.target));
        });
    }

    // 其他管理功能...
}

// 初始化
const dataManager = new DataManager();
