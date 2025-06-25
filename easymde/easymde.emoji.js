/**
 * easymde v1.0.0
 * Copyright blandh26
 * @link https://github.com/blandh26/easy-markdown-editor-emoji
 * @license MIT
 */
const EasyMDEemoji = (function () {// 独立的表情插件实现
    const translations = {// 多语言支持
        cn: { categories: { smileys: "表情符号", animalsnature: "动物自然", fooddrink: "食物饮品", travelplaces: "旅行地点", activities: "活动", objects: "物品", symbols: "符号" } },
        kr: { categories: { smileys: "스마일리", animalsnature: "동물&자연", fooddrink: "음식&음료", travelplaces: "여행&장소", activities: "활동", objects: "사물", symbols: "상징" } },
        en: { categories: { smileys: "Smileys", animalsnature: "Animals & Nature", fooddrink: "Food & Drink", travelplaces: "Travelplaces", activities: "Activities", objects: "Objects", symbols: "Symbols" } }
    };
    let currentLang = 'cn';// 当前语言（默认为中文）
    const emojiSet = {// 表情数据集（按类别分类）
        smileys: [
            "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "🫠", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋",
            "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🫢", "🫣", "🤫", "🤔", "🫡", "🤐", "🤨", "😐", "😑", "😶", "🫥", "😶‍🌫️", "😏", "😒", "🙄",
            "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳",
            "🥸", "😎", "🤓", "🧐", "😕", "🫤", "😟", "🙁", "☹", "😮", "😯", "😲", "😳", "🥺", "🥹", "😦", "😧", "😨", "😰", "😥", "😢", "😭",
            "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠", "💩", "🤡", "👹", "👺", "👻", "👽",
            "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "💌", "💘", "💝", "💖", "💗", "💓", "💞", "💕",
            "💟", "❣", "💔", "❤️‍🔥", "❤️‍🩹", "❤", "💋", "💯", "💢", "💥", "💫", "💦", "💨", "🕳", "💬", "👁️‍🗨️", "🗨", "🗯", "💭", "💤", "👌", "✌", "🫰",
            "🫵", "👍", "🤛", "🤜", "👏", "🙌", "🫶", "🤝", "🙏", "✍", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👅", "👄", "🫦"
        ],
        animalsnature: [
            "🐵", "🐒", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄",
            "🦓", "🦌", "🦬", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🦛",
            "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔",
            "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊", "🦅", "🦆", "🦢", "🦉", "🦤", "🪶", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲",
            "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "🐡", "🦈", "🐙", "🐚", "🐌", "🦋", "🐛", "🐜", "🐝", "🪲", "🐞", "🦗", "🪳",
            "🕷", "🕸", "🦂", "🦟", "🪰", "🪱", "🦠", "💐", "🌸", "💮", "🪷", "🏵", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱", "🪴", "🌲", "🌳",
            "🌴", "🌵", "🌾", "🌿", "☘", "🍀", "🍁", "🍂", "🍃", "🪹", "🪺", "🍄"
        ],
        fooddrink: [
            "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🫐", "🥝", "🍅", "🫒", "🥥", "🥑", "🍆", "🥔",
            "🥕", "🌽", "🌶", "🫑", "🥒", "🥬", "🥦", "🧄", "🧅", "🥜", "🫘", "🌰", "🍞", "🥐", "🥖", "🫓", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖",
            "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🫕", "🥣", "🥗", "🍿", "🧈",
            "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦀", "🦞", "🦐",
            "🦑", "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🫖", "🍵", "🍶",
            "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🫗", "🥤", "🧋", "🧃", "🧉", "🧊", "🥢", "🍽", "🍴", "🥄", "🔪", "🫙", "🏺"
        ],
        travelplaces: [
            "🌍", "🌎", "🌏", "🌐", "🗺", "🗾", "🧭", "🏔", "⛰", "🌋", "🗻", "🏕", "🏖", "🏜", "🏝", "🏞", "🏟", "🏛", "🏗", "🧱", "🪨", "🪵", "🛖", "🏘",
            "🏚", "🏠", "🏡", "🏢", "🏣", "🏤", "🏥", "🏦", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰", "💒", "🗼", "🗽", "⛪", "🕌", "🛕", "🕍",
            "⛩", "🕋", "⛲", "⛺", "🌁", "🌃", "🏙", "🌄", "🌅", "🌆", "🌇", "🌉", "♨", "🎠", "🛝", "🎡", "🎢", "💈", "🎪", "🚂", "🚃", "🚄", "🚅",
            "🚆", "🚇", "🚈", "🚉", "🚊", "🚝", "🚞", "🚋", "🚌", "🚍", "🚎", "🚐", "🚑", "🚒", "🚓", "🚔", "🚕", "🚖", "🚗", "🚘", "🚙", "🛻",
            "🚚", "🚛", "🚜", "🏎", "🏍", "🛵", "🦽", "🦼", "🛺", "🚲", "🛴", "🛹", "🛼", "🚏", "🛣", "🛤", "🛢", "⛽", "🛞", "🚨", "🚥", "🚦", "🛑",
            "🚧", "⚓", "🛟", "⛵", "🛶", "🚤", "🛳", "⛴", "🛥", "🚢", "✈", "🛩", "🛫", "🛬", "🪂", "💺", "🚁", "🚟", "🚠", "🚡", "🛰", "🚀", "🛸",
            "🧳", "⌛", "⏳", "⌚", "⏰", "⏱", "⏲", "🕰", "🌙", "🌚", "🌛", "🌜", "🌡", "☀", "🌝", "🌞", "🪐", "⭐", "🌟", "🌠", "🌌", "☁", "⛅", "⛈",
            "🌤", "🌥", "🌦", "🌧", "🌨", "🌩", "🌪", "🌫", "🌬", "🌀", "🌈", "🌂", "☂", "☔", "⛱", "⚡", "❄", "☃", "⛄", "☄", "🔥", "💧", "🌊"
        ],
        activities: [
            "🎃", "🎄", "🎆", "🎇", "🧨", "✨", "🎈", "🎉", "🎊", "🎋", "🎍", "🎎", "🎏", "🎐", "🎑", "🧧", "🎀", "🎁", "🎗", "🎟", "🎫", "🎖", "🏆",
            "🏅", "🥇", "🥈", "🥉", "⚽", "⚾", "🥎", "🏀", "🏐", "🏈", "🏉", "🎾", "🥏", "🎳", "🏏", "🏑", "🏒", "🥍", "🏓", "🏸", "🥊", "🥋", "🥅",
            "⛳", "⛸", "🎣", "🤿", "🎽", "🎿", "🛷", "🥌", "🎯", "🪀", "🪁", "🔫", "🎱", "🔮", "🪄", "🎮", "🕹", "🎰", "🎲", "🧩", "🧸", "🪅", "🪩",
            "🪆", "♠", "♥", "♦", "♣", "♟", "🃏", "🀄", "🎴", "🎭", "🖼", "🎨", "🧵", "🪡", "🧶", "🪢"
        ],
        objects: [
            "👓", "🕶", "🥽", "🥼", "🦺", "👔", "👕", "👖", "🧣", "🧤", "🧥", "🧦", "👗", "👘", "🥻", "🩱", "🩲", "🩳", "👙", "👚", "👛", "👜",
            "👝", "🛍", "🎒", "🩴", "👞", "👟", "🥾", "🥿", "👠", "👡", "🩰", "👢", "👑", "👒", "🎩", "🎓", "🧢", "🪖", "⛑", "📿", "💄", "💍",
            "💎", "🔇", "🔈", "🔉", "🔊", "📢", "📣", "📯", "🔔", "🔕", "🎼", "🎵", "🎶", "🎙", "🎚", "🎛", "🎤", "🎧", "📻", "🎷", "🪗", "🎸",
            "🎹", "🎺", "🎻", "🪕", "🥁", "🪘", "📱", "📲", "☎", "📞", "📟", "📠", "🔋", "🪫", "🔌", "💻", "🖥", "🖨", "⌨", "🖱", "🖲", "💽", "💾",
            "💿", "📀", "🧮", "🎥", "🎞", "📽", "🎬", "📺", "📷", "📸", "📹", "📼", "🔍", "🔎", "🕯", "💡", "🔦", "🏮", "🪔", "📔", "📕", "📖", "📗",
            "📘", "📙", "📚", "📓", "📒", "📃", "📜", "📄", "📰", "🗞", "📑", "🔖", "🏷", "💰", "🪙", "💴", "💵", "💶", "💷", "💸", "💳", "🧾",
            "💹", "✉", "📧", "📨", "📩", "📤", "📥", "📦", "📫", "📪", "📬", "📭", "📮", "🗳", "✏", "✒", "🖋", "🖊", "🖌", "🖍", "📝", "💼", "📁",
            "📂", "🗂", "📅", "📆", "🗒", "🗓", "📇", "📈", "📉", "📊", "📋", "📌", "📍", "📎", "🖇", "📏", "📐", "✂", "🗃", "🗄", "🗑", "🔒", "🔓",
            "🔏", "🔐", "🔑", "🗝", "🔨", "🪓", "⛏", "⚒", "🛠", "🗡", "⚔", "💣", "🪃", "🏹", "🛡", "🪚", "🔧", "🪛", "🔩", "⚙", "🗜", "⚖", "🦯",
            "🔗", "⛓", "🪝", "🧰", "🧲", "🪜", "⚗", "🧪", "🧫", "🧬", "🔬", "🔭", "📡", "💉", "🩸", "💊", "🩹", "🩼", "🩺", "🩻", "🚪", "🛗",
            "🪞", "🪟", "🛏", "🛋", "🪑", "🚽", "🪠", "🚿", "🛁", "🪤", "🪒", "🧴", "🧷", "🧹", "🧺", "🧻", "🪣", "🧼", "🫧", "🪥", "🧽", "🧯",
            "🛒", "🚬", "⚰", "🪦", "⚱", "🧿", "🪬", "🗿", "🪧", "🪧"
        ],
        symbols: [
            "🏧", "🚮", "🚰", "♿", "🚹", "🚺", "🚻", "🚼", "🚾", "🛂", "🛃", "🛄", "🛅", "⚠", "🚸", "⛔", "🚫", "🚳", "🚭", "🚯",
            "🚱", "🚷", "📵", "🔞", "☢", "☣", "⬆", "↗", "➡", "↘", "⬇", "↙", "⬅", "↖", "↕", "↔", "↩", "↪", "⤴", "⤵", "🔃", "🔄", "🔙",
            "🔚", "🔛", "🔜", "🔝", "🛐", "⚛", "🕉", "✡", "☸", "☯", "✝", "☦", "☪", "☮", "🕎", "🪯", "♈", "♉", "♊", "♋", "♌", "♍",
            "♎", "♏", "♐", "♑", "♒", "♓", "⛎", "🔀", "🔁", "🔂", "▶", "⏩", "⏭", "⏯", "◀", "⏪", "⏮", "🔼", "⏫", "🔽", "⏬",
            "⏸", "⏹", "⏺", "⏏", "🎦", "🔅", "🔆", "📶", "📳", "📴", "—", "—", "⚧", "✖", "➕", "➖", "➗", "🟰", "♾", "‼", "⁉", "❓",
            "❔", "❕", "❗", "〰", "💱", "💲", "—", "♻", "⚜", "🔱", "📛", "🔰", "⭕", "✅", "☑", "✔", "❌", "❎", "➰", "➿", "〽",
            "✳", "✴", "❇", "©", "®", "™", "#️⃣", "*️⃣", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔠", "🔡",
            "🔢", "🔣", "🔤", "🅰", "🆎", "🅱", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚫",
            "⚪", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫", "⬛", "⬜", "◼", "◻", "◾", "◽", "▪", "▫", "🔶", "🔷", "🔸", "🔹", "🔺",
            "🔻", "💠", "🔘", "🔳", "🔲", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍"
        ]
    };
    let easyMDE;
    // 创建表情对话框的函数
    function createEmojiDialog() {
        // 检查是否已存在表情对话框
        if (document.getElementById('emojiDialog')) return;

        // 创建对话框的HTML结构
        const dialogHTML = `
            <div class="emoji-dialog" id="emojiDialog">
                <div class="emoji-container">
                    <div class="emoji-categories">
                        <div class="category-buttons">
                            <button class="category-btn active" data-category="smileys">笑脸</button>
                            <button class="category-btn" data-category="animalsnature">动物自然</button>
                            <button class="category-btn" data-category="fooddrink">食物饮品</button>
                            <button class="category-btn" data-category="travelplaces">旅行地点</button>
                            <button class="category-btn" data-category="activities">活动</button>
                            <button class="category-btn" data-category="objects">物品</button>
                            <button class="category-btn" data-category="symbols">符号</button>
                        </div>
                        <button class="close-btn" id="closeEmojiBtn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="emoji-content" id="emojiContent">
                        <!-- 表情将通过JS动态生成 -->
                    </div>
                </div>
            </div>
            `;
        const cssStyle = `<style>.emoji-dialog{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:1000;opacity:0;visibility:hidden;transition:all 0.3s ease}.emoji-dialog.active{opacity:1;visibility:visible}.emoji-container{background:white;border-radius:12px;width:90%;max-width:800px;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 15px 50px rgba(0,0,0,0.3)}.emoji-content{padding:20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(50px,1fr));gap:15px;overflow-y:auto;max-height:calc(80vh - 100px)}.emoji-item{font-size:2.2rem;text-align:center;cursor:pointer;transition:all 0.2s ease;padding:10px;border-radius:8px}.emoji-item:hover{transform:scale(1.15)}.emoji-categories{display:flex;padding:15px 20px;border-bottom:1px solid #eee;background:#f9f9f9;overflow-x:auto;justify-content:space-between;align-items:center}.category-buttons{display:flex}.category-btn{padding:8px 16px;border-radius:20px;background:#f0f0f0;border:none;margin-right:10px;cursor:pointer;white-space:nowrap;transition:all 0.2s ease}.category-btn.active{background:#3498db;color:white}.close-btn{background:none;border:none;color:#2c3e50;font-size:1.5rem;cursor:pointer;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;margin-left:10px}.close-btn:hover{background:#f0f0f0;color:#e74c3c}</style>`;
        // 添加到body末尾
        document.body.insertAdjacentHTML('beforeend', dialogHTML);
        document.body.insertAdjacentHTML('beforeend', cssStyle);

        // 添加关闭按钮事件
        document.getElementById('closeEmojiBtn').addEventListener('click', closeDialog);

        // 添加分类按钮事件
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const category = this.dataset.category;
                generateEmojiContent(category);

                // 更新活动按钮
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
    function init(_easyMDE, lang = 'cn') { // 初始化插件
        easyMDE = _easyMDE; // 保存EasyMDE实例
        currentLang = lang;

        createEmojiDialog(); // 创建表情对话框
        setLanguage(currentLang);
        document.addEventListener('click', function (e) { // 添加事件监听器
            const dialog = document.getElementById('emojiDialog');
            if (dialog && dialog.classList.contains('active') && e.target === dialog) {
                closeDialog();
            }
        });

        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDialog(); } });
        const closeBtn = document.getElementById('closeEmojiBtn');
        if (closeBtn) { closeBtn.addEventListener('click', closeDialog); }

        // 分类按钮事件
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const category = this.dataset.category;
                generateEmojiContent(category);

                // 更新活动按钮
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            });
        });

        // 语言切换
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const lang = this.dataset.lang;
                setLanguage(lang);

                // 更新活动按钮
                document.querySelectorAll('.lang-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    // 设置语言
    function setLanguage(lang) {
        currentLang = lang;
        updateLanguage();
    }

    // 更新界面语言
    function updateLanguage() {
        const langData = translations[currentLang] || translations.zh;

        // 更新分类按钮
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            const category = btn.dataset.category;
            if (langData.categories[category]) {
                btn.textContent = langData.categories[category];
            }
        });
    }

    // 生成表情内容
    function generateEmojiContent(category = 'smileys') {
        const emojiContent = document.getElementById('emojiContent');
        if (!emojiContent) return;

        emojiContent.innerHTML = '';
        const emojis = emojiSet[category] || emojiSet.smileys;

        emojis.forEach(emoji => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'emoji-item';
            emojiElement.textContent = emoji;
            emojiElement.title = emoji;
            emojiElement.dataset.emoji = emoji;
            emojiElement.addEventListener('click', () => {
                insertEmoji(emoji);
                closeDialog();
            });
            emojiContent.appendChild(emojiElement);
        });
    }

    // 打开表情对话框
    function openDialog() {
        const dialog = document.getElementById('emojiDialog');
        if (!dialog) return;
        generateEmojiContent();
        dialog.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭表情对话框
    function closeDialog() {
        const dialog = document.getElementById('emojiDialog');
        if (dialog) {
            dialog.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // 插入表情到编辑器 - 修复版
    function insertEmoji(emoji) {
        // 获取当前光标位置
        const cursorPosition = easyMDE.codemirror.getCursor();
        // 插入表情
        easyMDE.codemirror.replaceSelection(emoji);
        // 设置光标位置到插入的表情后面
        easyMDE.codemirror.setCursor(cursorPosition.line, cursorPosition.ch + emoji.length);
    }

    // 获取工具栏按钮配置
    function getToolbarButton() {
        return {
            name: "emoji",
            action: openDialog,
            className: "fa fa-smile",
            title: "emoji",
        };
    }

    // 暴露公共API
    return {
        init: init,
        getToolbarButton: getToolbarButton,
        openDialog: openDialog,
        closeDialog: closeDialog,
        setLanguage: setLanguage
    };
})();