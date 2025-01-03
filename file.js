/**
 * ChatbotAPI provides a simple interface for interacting with a NimbleBrain Agent
 * @class
*/
class Chatbot {

    /**
     * Creates an instance of ChatbotAPI.
     * 
     * @constructor
     * @param {string} apiKey - The API key for authenticating requests to the chatbot service.
    */
    constructor(apiKey, config) {
        this.endpoint = 'https://api.nimblebrain.ai/v1/agents/67/query';
        this.apiKey = apiKey
        this.messages = config?.messages || [];
        this.setName(config?.name);
    }

    /**
     * Executes a query to the chatbot API and retrieves a response.
     * 
     * @async
     * @param {string} message - The query string to send to the chatbot API.
     * @returns {Promise<string>} - A promise that resolves to the chatbot's response.
     * @throws {Error} - Throws an error if the query is empty.
    */
    async sendMessage(message) {
        try {
            const response = await this.executeQuery(message);
            this.addToHistory(message, 'user');
            this.addToHistory(response.toString(), 'agent');
            return response;
        } catch (e) {
            if(e) {
                console.error(e);
                return null;
            }
        }
    }

    async executeQuery(query) {

        // Exceptions
        if(!query || query.length == 0 || query === '') {
            throw new Error('Query cannot be empty');
        };

        // Fetch response from API
        // const response = await fetch(this.endpoint, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${this.apiKey}`
        //     },
        //     body: JSON.stringify({ query }),
        //     mode: 'no-cors'
        // });

        // if(response.status !== 200) {
        //     throw new Error('Failed to fetch response from API');
        // }
        
        // const json = await response.json();
        // return json.response;
        
        // Mock response as API not available
        return `**Bold** *Italic* [Link](https://nimblebrain.ai)`;

    }

    /**
     * Adds a message to the chat history.
     * @param {string | Markdown} message 
     * @param {string} sender 
    */
    addToHistory(message, sender) {
        const timestamp = Date.now();
        this.messages.push({ message, sender, timestamp });
        localStorage.setItem('nimblebrain-history', JSON.stringify({ name: this.name, messages: this.messages, timestamp }));
    }

    /**
     * Sets the name of the chatbot
     * @param {string} name 
    */
    setName(name) {
        const NAMES = ['Samantha', 'James', 'Mike', 'Emily'];
        if(name) {
            this.name = name;
        } else {
            this.name = NAMES[Math.floor(Math.random() * NAMES.length)];
        }
        localStorage.setItem('nimblebrain-history', JSON.stringify({ name: this.name, messages: this.messages, timestamp: Date.now() }));
    }

}

/* ====== UTILS ====== */
function getScriptParams() {

    // Id assigned to <script> tag
    let script = document.getElementById('nimblebrain-chatbot');
    return {
        apiKey: script.getAttribute('data-api-key') || undefined,
    }
}

async function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

/* ====== STATE ====== */
const colors = {
    primary: 'hsl(216, 86%, 31%)',
    secondary: 'hsl(205, 76%, 84%)',
    text: 'hsl(0, 0%, 5%)',
    background: 'hsl(0, 0%, 94%)',
    foreground: 'hsl(0, 0%, 100%)',
    emerald: 'hsl(140, 52%, 55%)',
    emeraldShadow: 'hsla(140, 52%, 55%, 0.5)',
    muted: 'hsla(0, 0%, 5%, 0.5)',
}

const SVG = {
    robot: '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.49992 5.83334V3.16667H5.83325" stroke="#0D0D0D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5001 5.83333H4.50008C3.7637 5.83333 3.16675 6.43028 3.16675 7.16666V12.5C3.16675 13.2364 3.7637 13.8333 4.50008 13.8333H12.5001C13.2365 13.8333 13.8334 13.2364 13.8334 12.5V7.16666C13.8334 6.43028 13.2365 5.83333 12.5001 5.83333Z" stroke="#0D0D0D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.83325 9.83333H3.16659" stroke="#0D0D0D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.8333 9.83333H15.1666" stroke="#0D0D0D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 9.16667V10.5" stroke="#0D0D0D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 9.16667V10.5" stroke="#0D0D0D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    send: '<svg width="16" style="margin-bottom: 1px" height="16" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3_81)"><path d="M1.70216 1.39701C1.66094 1.37688 1.61461 1.36965 1.56921 1.37624C1.52382 1.38284 1.48146 1.40296 1.44767 1.43398C1.41388 1.465 1.39022 1.50548 1.37978 1.55015C1.36933 1.59482 1.37259 1.64159 1.38912 1.68438L2.69216 5.18009C2.76901 5.38644 2.76901 5.61357 2.69216 5.81992L1.38958 9.31563C1.37313 9.35837 1.36991 9.40506 1.38035 9.44965C1.39079 9.49424 1.4144 9.53465 1.44811 9.56565C1.48183 9.59664 1.52408 9.61678 1.56939 9.62344C1.61469 9.6301 1.66095 9.62298 1.70216 9.60301L9.95216 5.70717C9.9914 5.68861 10.0246 5.65929 10.0478 5.62261C10.071 5.58594 10.0834 5.54342 10.0834 5.50001C10.0834 5.45659 10.071 5.41408 10.0478 5.3774C10.0246 5.34072 9.9914 5.3114 9.95216 5.29284L1.70216 1.39701Z" stroke="#F0F0F0" stroke-width="0.916667" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.75 5.5H10.0833" stroke="#F0F0F0" stroke-width="0.916667" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_3_81"><rect width="11" height="11" fill="white"/></clipPath></defs></svg>',
    help: '<svg width="24" style="margin-bottom: 2px" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.9 20C9.80858 20.9791 12.0041 21.2442 14.0909 20.7478C16.1777 20.2513 18.0186 19.0258 19.2818 17.2922C20.545 15.5585 21.1474 13.4307 20.9806 11.2922C20.8137 9.15361 19.8886 7.14497 18.3718 5.62819C16.855 4.11142 14.8464 3.18625 12.7078 3.01942C10.5693 2.85258 8.44147 3.45505 6.70782 4.71825C4.97417 5.98145 3.74869 7.82231 3.25222 9.90911C2.75575 11.9959 3.02094 14.1914 4 16.1L2 22L7.9 20Z" stroke="#F0F0F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.09009 9.00001C9.32519 8.33167 9.78924 7.76811 10.4 7.40914C11.0108 7.05016 11.729 6.91894 12.4273 7.03872C13.1255 7.15849 13.7589 7.52153 14.2152 8.06353C14.6714 8.60554 14.9211 9.29153 14.9201 10C14.9201 12 11.9201 13 11.9201 13" stroke="#F0F0F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 17H12.01" stroke="#F0F0F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    minimize: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 14H10V20" stroke="#F0F0F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 10H14V4" stroke="#F0F0F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 10L21 3" stroke="#F0F0F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 21L10 14" stroke="#F0F0F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
}

// Remove margin from all elemetns

// Chat is closed by default
let isChatOpen = false;

const fontFamily = 'Arial, sans-serif';
const borderRadius = window.innerWidth < 900 ? '8px' : '12px';
const buttonWidth = window.innerWidth < 900 ? '40px' : '50px';
const chatWidth = window.innerWidth < 900 ? '250px' : '390px';
const chatHeight = window.innerWidth < 900 ? window.innerHeight < 800 ? window.innerHeight < 600 ? '400px' : '500px' : '400px' : '625px';
const headerHeight = window.innerWidth < 900 ? '50px' : '75px';
const headerPaddingHorizontal = window.innerWidth < 900 ? '19px' : '12px';
const headerNameFontSize = window.innerWidth < 900 ? '16px' : '20px';
const headerStatusFontSize = window.innerWidth < 900 ? '8px' : '12px';
const avatarWidth = window.innerWidth < 900 ? '25px' : '40px';
const statusWidth = window.innerWidth < 900 ? '2px' : '4px';
const queryInputHeight = window.innerWidth < 900 ? '35px' : '50px';
const sendBtnWidth = window.innerWidth < 900 ? '20px' : '30px';
const padding = window.innerWidth < 900 ? '8px' : '12px';
const messageFontSize = window.innerWidth < 900 ? '12px' : '16px';

const margins = {
    right: window.innerWidth < 900 ? window.innerWidth < 500 ? 20 : 30 : 40,
    bottom: window.innerWidth < 900 ? 30 : 40,
}

/* ====== INITIALIZATION ====== */

// Load history
let history = JSON.parse(localStorage.getItem('nimblebrain-history'));

// Clear chat history if greater than 10 minute(s) old
if(history && Date.now() - history?.timestamp > 1000 * 60 * 10) {
    localStorage.removeItem('nimblebrain-history');
    history = null;
}

// Fetch API key and initialise Chatbot
const { apiKey } = getScriptParams();
let chatbot = new Chatbot(apiKey, history);

// Load markdown parser
let parserScript = document.createElement('script');
parserScript.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(parserScript, firstScriptTag);
let md;

/* ====== BUILD UI ====== */
function loadChatbot() {

    const chatWrapper = createWrapper(margins);
    const chat = createChat();
    const toggleButton = createToggleButton(chat);

    chatWrapper.appendChild(chat);
    chatWrapper.appendChild(toggleButton);

    // Append element to DOM
    document.body.appendChild(chatWrapper);
}

function createWrapper(margins) {

    const el = document.createElement('div');

    el.style.position = 'fixed';
    el.style.gap = '32px';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'flex-end';
    el.style.justifyContent = 'flex-end';
    el.style.bottom = margins.bottom ? `${margins.bottom}px` : undefined;
    el.style.right = margins.right ? `${margins.right}px` : undefined;
    el.style.left = margins.left ? `${margins.left}px` : undefined;
    el.style.top = margins.top ? `${margins.top}px` : undefined;
    el.style.maxWidth = '390px';

    return el;
}

function createChat() {
    
    const el = document.createElement('div');

    el.style.width = chatWidth;
    el.style.height = chatHeight;
    el.style.flexShrink = 1;
    el.style.background = colors.background;
    el.style.display = 'none';
    el.style.flexDirection = 'column';
    el.style.boxSizing = 'border-box'
    el.style.boxShadow = '0 4px 4px 0 hsla(0, 0%, 0%, 0.25)';
    el.style.borderRadius = borderRadius;
    el.style.overflow = 'hidden';

    const header = createChatHeader();
    const messagesContainer = createMessageDisplay();
    const queryInput = createQueryInput(messagesContainer);

    el.appendChild(header);
    el.appendChild(messagesContainer);
    el.appendChild(queryInput);
    
    // Load chat history
    if(chatbot.messages) {
        chatbot.messages.forEach(message => {
            const messageElementElement = createMessageElement(message.message, message.sender);
            messagesContainer.appendChild(messageElementElement);
        });
    }
    
    return el;
}

function createChatHeader() {

    const el = document.createElement('div');
    
    el.style.flexShrink = '1';
    el.style.minHeight = headerHeight;
    el.style.background = colors.primary;
    el.style.display = 'flex';
    el.style.flexDirection = 'row';
    el.style.zIndex = 100;
    el.style.alignItems = 'center';
    el.style.paddingInline = padding;
    el.style.gap = padding;
    el.style.boxShadow = '0 -1px 6px 5px hsla(0, 0%, 0%, 0.17)';
    
    const content = document.createElement('div');
    
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.gap = window.innerWidth < 900 ? '3px' : '5px';

    const headerName = document.createElement('p');

    headerName.style.fontFamily = fontFamily;
    headerName.style.fontSize = headerNameFontSize;
    headerName.style.color = colors.foreground;
    headerName.style.lineHeight = '100%';
    headerName.style.margin = '0';

    headerName.innerText = chatbot.name;
    content.appendChild(headerName);

    const status = createStatus();
    content.appendChild(status);

    
    const avatar = createAvatar();
    el.appendChild(avatar);
    el.appendChild(content);

    return el;

}

function createStatus() {

    const el = document.createElement('div');
    el.style.display = 'flex';
    el.style.flexDirection = 'row';
    el.style.alignItems = 'center';
    el.style.gap = '5px';

    const greenLight = document.createElement('div');

    greenLight.style.width = statusWidth;
    greenLight.style.height = statusWidth;
    greenLight.style.borderRadius = '9999px';
    greenLight.style.background = colors.emerald;
    greenLight.style.boxShadow = `0 0 2px 2px ${colors.emeraldShadow}`;

    const status = document.createElement('p');
    status.style.color = colors.foreground;
    status.style.fontFamily = fontFamily
    status.style.fontSize = headerStatusFontSize;
    status.style.margin = '0';

    status.innerText = 'Online';

    el.appendChild(greenLight);
    el.appendChild(status);

    return el;

}

function createAvatar() {

    const el = document.createElement('div');

    el.style.width = avatarWidth;
    el.style.aspectRatio = '1/1';
    el.style.background = colors.background;
    el.style.borderRadius = '9999px';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';

    el.innerHTML = `<span style="scale: ${window.innerWidth < 900 ? '1' : '1.4'}">${SVG.robot}</span>`;

    return el;

}

function createMessageDisplay() {

    const el = document.createElement('div');

    el.style.paddingBlock = '20px';
    el.style.gap = padding;
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.paddingInline = padding;
    el.style.flexShrink = 1;
    el.style.height = '100%';
    el.style.overflowY = 'scroll';
    el.style.overscrollBehavior = 'contain';

    return el;

}

function createMessageElement(message, sender) {

    const el = document.createElement('div');

    el.style.display = 'flex';
    el.style.width = 'fit-content';
    el.style.paddingInline = padding;
    el.style.borderRadius = borderRadius;
    el.style.fontFamily = fontFamily;
    el.style.background = colors.foreground;
    el.style.borderBottomLeftRadius = '0';
    el.style.maxWidth = '80%';

    if(sender === 'user') {
        el.style.background = colors.secondary;
        el.style.marginLeft = 'auto';
        el.style.borderBottomRightRadius = '0';
        el.style.borderBottomLeftRadius = borderRadius;
    }

    el.innerHTML = md.render(`${message}`);
    
    return el;

} 

function createQueryInput(messagesContainer) {

    const el = document.createElement('div');

    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.background = colors.background;
    el.style.padding = padding;
    el.style.zIndex = 100;

    const inputWrapper = document.createElement('div');

    inputWrapper.style.display = 'flex';
    inputWrapper.style.alignItems = 'center';
    inputWrapper.style.background = colors.foreground;
    inputWrapper.style.borderRadius = borderRadius;
    inputWrapper.style.width = '100%';
    inputWrapper.style.height = queryInputHeight;
    inputWrapper.style.overflow = 'hidden';
    inputWrapper.style.boxShadow = '0 4px 4px 0 hsla(0, 0%, 0%, 0.1)';

    const input = document.createElement('input');

    input.style.flexGrow = '1';
    input.style.border = 'none';
    input.style.height = '100%';
    input.style.outline = 'none';
    input.style.paddingInline = padding;

    input.setAttribute('type', 'text');
    input.setAttribute('id', 'nimblebrain-query-input');

    input.placeholder = 'How can we help you today?';

    const sendButton = document.createElement('button');

    sendButton.style.backgroundColor = colors.primary;
    sendButton.style.background = 'linear-gradient(36deg, rgba(98,143,195,1) 0%, rgba(11,65,145,1) 67%);';
    sendButton.style.display = 'flex';
    sendButton.style.alignItems = 'center';
    sendButton.style.justifyContent = 'center';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '50%';
    sendButton.style.aspectRatio = '1/1';
    sendButton.style.marginLeft = 'auto';
    sendButton.style.marginRight = padding;
    sendButton.style.width = sendBtnWidth;
    sendButton.style.cursor = 'pointer';
    sendButton.style.display = 'flex';

    sendButton.addEventListener('mousedown', (e) =>{
        sendButton.style.scale = `0.8`;
    });

    sendButton.addEventListener('mouseup', (e) => {
        sendButton.style.scale = `1`;
    })
    
    sendButton.addEventListener('mouseleave', (e) => {
        sendButton.style.scale = `1`;
    })
    
    sendButton.addEventListener('click', async (e) => {

        if(!input.value) return;

        // Get message
        const message = input.value;

        // Clear input
        input.value = '';
        input.placeholder = 'Ask a question...';

        // Add user message to DOM
        const messageElement = createMessageElement(message, 'user');
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Artifical delay
        await sleep(1000);
        
        const response = await chatbot.sendMessage(message);
        if(response) {
            const responseElement = createMessageElement(response, 'agent');
            messagesContainer.appendChild(responseElement);
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
    })
    
    sendButton.innerHTML = SVG.send;

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(sendButton);
    el.appendChild(inputWrapper)

    return el;
}

function createToggleButton(wrapper) {

    const el = document.createElement('button');

    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.width = buttonWidth;
    el.style.aspectRatio = '1/1';
    el.style.backgroundColor = colors.primary;
    el.style.zIndex = 100;
    el.style.borderRadius = '50%';
    el.style.transition = '50ms';
    el.style.boxShadow = '0 4px 4px 0 hsla(0, 0%, 0%, 0.25)';
    el.style.border = 'none';
    el.style.cursor = 'pointer';

    el.addEventListener('mousedown', (e) =>{
        el.style.scale = `0.8`;
    });

    el.addEventListener('mouseup', (e) => {
        el.style.scale = `1`;
    })
    
    el.addEventListener('mouseleave', (e) => {
        el.style.scale = `1`;
    })
    
    el.addEventListener('click', () => {
        // TODO: Open Chat.
        if(isChatOpen) {
            wrapper.style.display = 'none';
            el.innerHTML = SVG.help;
            isChatOpen = false;
        } else {
            wrapper.style.display = 'flex';
            el.innerHTML = SVG.minimize;
            isChatOpen = true;
        }
    })
    
    el.innerHTML = SVG.help;

    return el;
}

// Inject chatbot when webpage has fully loaded
window.addEventListener("load", (e) => {
    e.preventDefault();
    md = window.markdownit({ html: true});
    loadChatbot();
});