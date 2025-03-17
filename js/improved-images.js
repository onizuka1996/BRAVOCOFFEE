// ฟังก์ชันสร้างรูปภาพ SVG คุณภาพสูงสำหรับเมนูกาแฟ
function createImprovedCoffeeImageSVG(name, category) {
    const colors = {
        hot: {
            cup: '#8B4513',
            coffee: '#5A3A1F',
            steam: '#EEEEEE'
        },
        cold: {
            cup: '#5B92E5',
            coffee: '#7BA7E8',
            ice: '#E0F0FF'
        },
        frappe: {
            cup: '#8B7355',
            coffee: '#A68C69',
            cream: '#F5F5DC'
        }
    };
    
    const colorSet = colors[category] || colors.hot;
    
    // สร้าง SVG ที่มีรายละเอียดมากขึ้นตามประเภทกาแฟ
    if (category === 'frappe') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
            <defs>
                <linearGradient id="frappeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#F8F8F8" />
                    <stop offset="100%" stop-color="#E8E8E8" />
                </linearGradient>
                <linearGradient id="frappeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="${colorSet.cream}" />
                    <stop offset="60%" stop-color="${colorSet.coffee}" />
                    <stop offset="100%" stop-color="${colorSet.cup}" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#00000044" />
                </filter>
            </defs>
            <rect width="300" height="200" fill="url(#frappeBg)"/>
            <g transform="translate(150, 100)">
                <!-- แก้วปั่น -->
                <path d="M-40 -70 L-30 60 L30 60 L40 -70 Z" fill="#FFFFFF" stroke="${colorSet.cup}" stroke-width="3" filter="url(#shadow)"/>
                <path d="M-30 -50 L-25 50 L25 50 L30 -50 Z" fill="url(#frappeGradient)" opacity="0.9"/>
                
                <!-- ฟองครีม -->
                <ellipse cx="0" cy="-50" rx="30" ry="10" fill="#FFFFFF" opacity="0.9"/>
                <path d="M-25 -50 C-20 -55, -10 -60, 0 -58 C10 -60, 20 -55, 25 -50" fill="none" stroke="#FFFFFF" stroke-width="3"/>
                
                <!-- หลอด -->
                <path d="M-5 -70 L-5 -50 M5 -70 L5 -50" stroke="#FF5252" stroke-width="3" stroke-linecap="round"/>
                
                <!-- วิปครีม -->
                <ellipse cx="0" cy="-70" rx="15" ry="8" fill="#FFFFFF" stroke="${colorSet.cream}" stroke-width="1"/>
                <path d="M-10 -75 Q0 -85, 10 -75" fill="none" stroke="#FFFFFF" stroke-width="3"/>
                
                <!-- ท็อปปิ้ง -->
                <circle cx="-8" cy="-75" r="3" fill="#8B0000"/>
                <circle cx="0" cy="-78" r="3" fill="#8B0000"/>
                <circle cx="8" cy="-75" r="3" fill="#8B0000"/>
                
                <text x="0" y="80" font-family="Arial" font-size="14" font-weight="bold" fill="#333" text-anchor="middle">${name}</text>
            </g>
        </svg>`;
    } else if (category === 'cold') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
            <defs>
                <linearGradient id="coldBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#F8F8F8" />
                    <stop offset="100%" stop-color="#E8E8E8" />
                </linearGradient>
                <linearGradient id="coldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="${colorSet.ice}" />
                    <stop offset="40%" stop-color="${colorSet.coffee}" />
                    <stop offset="100%" stop-color="${colorSet.cup}" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#00000044" />
                </filter>
            </defs>
            <rect width="300" height="200" fill="url(#coldBg)"/>
            <g transform="translate(150, 100)">
                <!-- แก้วเย็น -->
                <path d="M-35 -70 L-25 60 L25 60 L35 -70 Z" fill="#FFFFFF" stroke="${colorSet.cup}" stroke-width="2" filter="url(#shadow)" opacity="0.7"/>
                <path d="M-30 -60 L-22 50 L22 50 L30 -60 Z" fill="url(#coldGradient)" opacity="0.9"/>
                
                <!-- น้ำแข็ง -->
                <polygon points="-20,-40 -10,-50 0,-40 10,-50 20,-40 15,-30 -15,-30" fill="${colorSet.ice}" opacity="0.7"/>
                <polygon points="-15,-20 -5,-30 5,-20 15,-30 20,-20 10,-10 -10,-10" fill="${colorSet.ice}" opacity="0.7"/>
                
                <!-- หลอด -->
                <path d="M0 -70 L0 -30" stroke="#FF5252" stroke-width="3" stroke-linecap="round"/>
                
                <!-- ฝาแก้ว -->
                <ellipse cx="0" cy="-70" rx="35" ry="10" fill="${colorSet.cup}" opacity="0.9"/>
                <ellipse cx="0" cy="-70" rx="30" ry="5" fill="#FFFFFF" opacity="0.5"/>
                
                <!-- หยดน้ำ -->
                <path d="M-25 -20 Q-20 -15, -25 -10 M-15 0 Q-10 5, -15 10 M10 -15 Q15 -10, 10 -5" fill="none" stroke="${colorSet.ice}" stroke-width="2"/>
                
                <text x="0" y="80" font-family="Arial" font-size="14" font-weight="bold" fill="#333" text-anchor="middle">${name}</text>
            </g>
        </svg>`;
    } else { // hot
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
            <defs>
                <linearGradient id="hotBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#F8F8F8" />
                    <stop offset="100%" stop-color="#E8E8E8" />
                </linearGradient>
                <linearGradient id="hotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="${colorSet.steam}" />
                    <stop offset="30%" stop-color="${colorSet.coffee}" />
                    <stop offset="100%" stop-color="${colorSet.cup}" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#00000044" />
                </filter>
            </defs>
            <rect width="300" height="200" fill="url(#hotBg)"/>
            <g transform="translate(150, 100)">
                <!-- แก้วร้อน -->
                <path d="M-40 -20 C-45 -10, -45 50, -20 60 L20 60 C45 50, 45 -10, 40 -20 Z" fill="#FFFFFF" stroke="${colorSet.cup}" stroke-width="3" filter="url(#shadow)"/>
                <path d="M-35 -15 C-40 -5, -40 45, -18 55 L18 55 C40 45, 40 -5, 35 -15 Z" fill="url(#hotGradient)" opacity="0.9"/>
                
                <!-- จานรอง -->
                <ellipse cx="0" cy="60" rx="40" ry="10" fill="#FFFFFF" stroke="${colorSet.cup}" stroke-width="2"/>
                
                <!-- ไอน้ำ -->
                <path d="M-10 -30 Q-5 -40, 0 -30 Q5 -40, 10 -30" fill="none" stroke="${colorSet.steam}" stroke-width="2" opacity="0.7">
                    <animate attributeName="d" values="M-10 -30 Q-5 -40, 0 -30 Q5 -40, 10 -30; M-10 -35 Q-5 -45, 0 -35 Q5 -45, 10 -35; M-10 -30 Q-5 -40, 0 -30 Q5 -40, 10 -30" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M-20 -25 Q-15 -35, -10 -25 Q-5 -35, 0 -25" fill="none" stroke="${colorSet.steam}" stroke-width="2" opacity="0.5">
                    <animate attributeName="d" values="M-20 -25 Q-15 -35, -10 -25 Q-5 -35, 0 -25; M-20 -30 Q-15 -40, -10 -30 Q-5 -40, 0 -30; M-20 -25 Q-15 -35, -10 -25 Q-5 -35, 0 -25" dur="4s" repeatCount="indefinite" />
                </path>
                <path d="M0 -25 Q5 -35, 10 -25 Q15 -35, 20 -25" fill="none" stroke="${colorSet.steam}" stroke-width="2" opacity="0.5">
                    <animate attributeName="d" values="M0 -25 Q5 -35, 10 -25 Q15 -35, 20 -25; M0 -30 Q5 -40, 10 -30 Q15 -40, 20 -30; M0 -25 Q5 -35, 10 -25 Q15 -35, 20 -25" dur="3.5s" repeatCount="indefinite" />
                </path>
                
                <!-- ฟองนม (สำหรับลาเต้หรือคาปูชิโน่) -->
                <ellipse cx="0" cy="-15" rx="35" ry="10" fill="#FFFFFF" opacity="0.3"/>
                
                <text x="0" y="80" font-family="Arial" font-size="14" font-weight="bold" fill="#333" text-anchor="middle">${name}</text>
            </g>
        </svg>`;
    }
}

// ฟังก์ชันสร้างรูปภาพกาแฟเป็น SVG (สำหรับการใช้งานในไฟล์อื่น)
function createCoffeeImageSVG(name, category) {
    return createImprovedCoffeeImageSVG(name, category);
}