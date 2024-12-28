document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const toast1 = document.querySelector('.toast1');
    const toast2 = document.querySelector('.toast2');
    
    const themes = {
        dark: {
            previewBg: '#1a1b1e',
            charBoxBg: '#2c2f33',
            charBoxShColor: '#7289da',
            charBoxShOpacity: 0.3,
            userBoxBg: '#7289da',
            userBoxShColor: '#7289da',
            userBoxShOpacity: 0.2,
            buttonColor: '#99aab5',
            buttonColorHv: '#7289da',
            buttonColorOn: '#43b581',
            buttonSend: '#99aab5',
            buttonSendHv: '#7289da',
            textColor: '#ffffff'
        },
        light: {
            previewBg: '#f8f9fa',
            charBoxBg: '#e9ecef',
            charBoxShColor: '#495057',
            charBoxShOpacity: 0.1,
            userBoxBg: '#228be6',
            userBoxShColor: '#228be6',
            userBoxShOpacity: 0.2,
            buttonColor: '#495057',
            buttonColorHv: '#228be6',
            buttonColorOn: '#40c057',
            buttonSend: '#495057',
            buttonSendHv: '#e9ecef',
            textColor: '#212529'
        },
        deep_ocean: {
            previewBg: '#15202b',
            charBoxBg: '#1c2733',
            charBoxShColor: '#1da1f2',
            charBoxShOpacity: 0.2,
            userBoxBg: '#1da1f2',
            userBoxShColor: '#198cd4',
            userBoxShOpacity: 0.2,
            buttonColor: '#8899a6',
            buttonColorHv: '#1da1f2',
            buttonColorOn: '#17bf63',
            buttonSend: '#8899a6',
            buttonSendHv: '#1da1f2',
            textColor: '#ffffff'
        },
        forest_night: {
            previewBg: '#1b2428',
            charBoxBg: '#2d4739',
            charBoxShColor: '#48a860',
            charBoxShOpacity: 0.2,
            userBoxBg: '#48a860',
            userBoxShColor: '#228b22',
            userBoxShOpacity: 0.3,
            buttonColor: '#8fb996',
            buttonColorHv: '#48a860',
            buttonColorOn: '#3cb371',
            buttonSend: '#8fb996',
            buttonSendHv: '#2d4739',
            textColor: '#d8f3dc'
        },
        sunset_warmth: {
            previewBg: '#fff5f5',
            charBoxBg: '#ffd8d8',
            charBoxShColor: '#ff6b6b',
            charBoxShOpacity: 0.2,
            userBoxBg: '#ff6b6b',
            userBoxShColor: '#e64949',
            userBoxShOpacity: 0.2,
            buttonColor: '#ffa8a8',
            buttonColorHv: '#ff6b6b',
            buttonColorOn: '#ff922b',
            buttonSend: '#ffa8a8',
            buttonSendHv: '#ffd8d8',
            textColor: '#c92a2a'
        },
        sakura_pink: {
            previewBg: '#fff0f3',
            charBoxBg: '#ffffff',
            charBoxShColor: '#ffaab4',
            charBoxShOpacity: 0.5,
            userBoxBg: '#ffb4c0',
            userBoxShColor: '#ff8a96',
            userBoxShOpacity: 0.2,
            buttonColor: '#ffc9c9',
            buttonColorHv: '#ffb4c0',
            buttonColorOn: '#e64980',
            buttonSend: '#ffffff',
            buttonSendHv: '#ffb4c0',
            textColor: '#e64980'
        }
    };

    const cssVarMap = {
        previewBg: '--preview-bg',
        charBoxBg: '--char-box-bg',
        charBoxShColor: '--char-box-sh',
        userBoxBg: '--user-box-bg',
        userBoxShColor: '--user-box-sh',
        buttonColor: '--button-color',
        buttonColorHv: '--button-color-hv',
        buttonColorOn: '--button-color-on',
        buttonSend: '--button-send',
        buttonSendHv: '--button-send-hv',
        textColor: '--text-color',
        borderRadius: '--border-radius',
        profileSize: '--profile-size',
        profileRadius: '--profile-radius',
        chatWidth: '--chat-width'
    };

    function hexToRgba(hex, opacity) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${opacity})`;
    }

    function updateCSSVariable(id, value) {
        let varName = cssVarMap[id] || `--${id}`;
        
        if (id.endsWith('Radius') || id === 'profileSize' || id === 'chatWidth') {
            value = `${value}px`;
        }
        
        if (id === 'charBoxShColor') {
            const opacity = document.getElementById('charBoxShOpacity')?.value || 1;
            root.style.setProperty('--char-box-sh', hexToRgba(value, opacity));
        } else if (id === 'userBoxShColor') {
            const opacity = document.getElementById('userBoxShOpacity')?.value || 1;
            root.style.setProperty('--user-box-sh', hexToRgba(value, opacity));
        } else {
            root.style.setProperty(varName, value);
        }
    }

    function initColorPickers() {
        document.querySelectorAll('.color-picker').forEach(picker => {
            const input = picker.querySelector('input[type="color"]');
            const preview = picker.querySelector('.color-preview');
            const value = picker.querySelector('.color-value');

            if (!input || !preview || !value) return;

            preview.style.backgroundColor = input.value;
            value.textContent = input.value;

            input.addEventListener('input', (e) => {
                const color = e.target.value;
                preview.style.backgroundColor = color;
                value.textContent = color;
                updateCSSVariable(input.id, color);
            });

            preview.addEventListener('click', () => input.click());
        });
    }

    function initRangeSliders() {
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            const value = slider.nextElementSibling;
            if (!value) return;

            const initialValue = slider.id.includes('Opacity') ? slider.value : `${slider.value}px`;
            value.textContent = initialValue;

            slider.addEventListener('input', (e) => {
                const newValue = e.target.value;
                value.textContent = slider.id.includes('Opacity') ? newValue : `${newValue}px`;

                if (slider.id === 'charBoxShOpacity') {
                    const color = document.getElementById('charBoxShColor')?.value;
                    if (color) {
                        root.style.setProperty('--char-box-sh', hexToRgba(color, newValue));
                    }
                } else if (slider.id === 'userBoxShOpacity') {
                    const color = document.getElementById('userBoxShColor')?.value;
                    if (color) {
                        root.style.setProperty('--user-box-sh', hexToRgba(color, newValue));
                    }
                } else {
                    updateCSSVariable(slider.id, newValue);
                }
            });
        });
    }

    function applyTheme(theme) {
        Object.entries(theme).forEach(([key, value]) => {
            // Update control values
            const control = document.getElementById(key);
            if (control) {
                control.value = value;
                const picker = control.closest('.color-picker');
                if (picker) {
                    picker.querySelector('.color-preview').style.backgroundColor = value;
                    picker.querySelector('.color-value').textContent = value;
                }
                if (key.includes('Opacity')) {
                    control.nextElementSibling.textContent = value;
                }
            }

            if (key.includes('ShColor')) {
                const opacity = theme[key.replace('ShColor', 'ShOpacity')] || 1;
                const shadowVar = key.includes('char') ? '--char-box-sh' : '--user-box-sh';
                root.style.setProperty(shadowVar, hexToRgba(value, opacity));
            } else if (!key.includes('ShOpacity')) {
                const cssVar = cssVarMap[key] || `--${key.toLowerCase()}`;
                root.style.setProperty(cssVar, value);
            }
        });
    }

    function initThemeDropdown() {
     const themeSelect = document.querySelector('.theme-select');
     const themeOptions = document.querySelector('.theme-options');
    
     themeSelect.addEventListener('click', () => {
        themeOptions.classList.toggle('show');
       });

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            const theme = themes[option.dataset.theme];
            if (theme) {
                applyTheme(theme);
                themeOptions.classList.remove('show');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-dropdown')) {
            themeOptions.classList.remove('show');
        }
    });
    }

    function initInteractionButtons() {
        document.querySelectorAll('.button-group svg').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.button-group svg').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    function initCopyButton() {
        const copyBtn = document.querySelector('.copy-css-btn');
        if (!copyBtn) return;

        copyBtn.addEventListener('click', () => {
            const css = `
                :root {
--preview-bg: ${getComputedStyle(root).getPropertyValue('--preview-bg')};
--char-box-bg: ${getComputedStyle(root).getPropertyValue('--char-box-bg')};
--char-box-sh: ${getComputedStyle(root).getPropertyValue('--char-box-sh')};
--user-box-bg: ${getComputedStyle(root).getPropertyValue('--user-box-bg')};
--user-box-sh: ${getComputedStyle(root).getPropertyValue('--user-box-sh')};
--button-color: ${getComputedStyle(root).getPropertyValue('--button-color')};
--button-color-hv: ${getComputedStyle(root).getPropertyValue('--button-color-hv')};
--button-color-on: ${getComputedStyle(root).getPropertyValue('--button-color-on')};
--button-send: ${getComputedStyle(root).getPropertyValue('--button-send')};
--button-send-hv: ${getComputedStyle(root).getPropertyValue('--button-send-hv')};
--border-radius: ${getComputedStyle(root).getPropertyValue('--border-radius')};
--profile-size: ${getComputedStyle(root).getPropertyValue('--profile-size')};
--profile-radius: ${getComputedStyle(root).getPropertyValue('--profile-radius')};
--chat-width: ${getComputedStyle(root).getPropertyValue('--chat-width')};
--text-color: ${getComputedStyle(root).getPropertyValue('--text-color')};
}
/*---------------------------*/
body {
    background-color: var(--preview-bg);
    display: flex;
    justify-content: center;
    align-items: center;
}

.risu-chat > div > div {
    margin-left: auto;
    margin-right: auto;
    width: var(--chat-width);
    position: relative;
}

.char-image > div, .user-image > div {
    background-position: center !important;
    background-size: cover !important;
    border-radius: var(--profile-radius);
    width: var(--profile-size) !important;
    height: var(--profile-size) !important;
}

.char-box-wrapper, .user-box-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
}

.profile-and-button {
    position: absolute;
    max-width: var(--profile-size);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.char-box-wrapper .profile-and-button {
    left: calc(-1 * (var(--profile-size) + 40px));
}

.user-box-wrapper .profile-and-button {
    right: calc(-1 * (var(--profile-size) + 40px));
}

.char-chat-box, .user-chat-box {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.user-chat-box {
    align-items: flex-end;
}

.chat-box > span {
    max-width: 100%;
    width: fit-content;
    display: inline-block;
    border-radius: var(--border-radius);
    padding: 1rem 1rem;
    word-break: break-word;
    overflow-wrap: break-word;
    margin-bottom: 2rem;
    transform: translateY(0.5rem);
}

.char-chat-box > span {
    background-color: var(--char-box-bg);
    box-shadow: var(--char-box-sh);
}

.user-chat-box > span {
    background-color: var(--user-box-bg);
    text-align: left;
    box-shadow: var(--user-box-sh);
}

.character-button > div {
    color: var(--button-color);
    transform: scale(0.6);
    margin-top: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    pointer-events: auto;
}

.character-button > div > button.ml-2:hover {
  color: var(--button-color-hv) !important;
}

.character-button > div:hover {
    opacity: 1;
}

.character-button > div > span {
    font-size: 0;
}

.character-button > div > button.ml-2.text-blue-400 {
  color: var(--button-color-on) !important;

}

#app > main .default-chat-screen > :first-child {
    width: 40rem;
    margin-left: auto;
    margin-right: auto;
}

button.peer-focus\\:border-textcolor {
  color: var(--button-send) !important;
}

button.peer-focus\\:border-textcolor:hover {
  background-color: var(--button-send-hv) !important;
}`.trim();
            navigator.clipboard.writeText(css)
                .then(() => {
                    toast1.classList.add('show');
                    setTimeout(() => toast1.classList.remove('show'), 2000);
                })
                .catch(err => console.error('Failed to copy CSS:', err));
        });
    }

    function initCopyHTMLButton() {
        const copyHTMLBtn = document.querySelector('.copy-html-btn');
        if (!copyHTMLBtn) return;

         copyHTMLBtn.addEventListener('click', () => {
           const html = `<div class="{{#if {{equal::{{role}}::char}} }}char{{/if}}{{#if {{not_equal::{{role}}::char}} }}user{{/if}}-box-wrapper">
    <div class="profile-and-button"> <div class="{{#if {{equal::{{role}}::char}} }}char-image{{/if}}{{#if {{not_equal::{{role}}::char}} }}user-image{{/if}} profile-container">
            <risuicon></risuicon>
        </div>
        <div class="character-button"> <risubuttons></risubuttons> </div>
    </div>
    <div class="{{#if {{equal::{{role}}::char}} }}char{{/if}}{{#if {{not_equal::{{role}}::char}} }}user{{/if}}-chat-box chat-box">
        <risutextbox></risutextbox>
    </div>
</div>`;
        
           navigator.clipboard.writeText(html)
               .then(() => {
                  toast2.classList.add('show');
                 setTimeout(() => toast2.classList.remove('show'), 2000);
                })
                .catch(err => console.error('Failed to copy HTML text:', err));
        });
    }

    function parseCSSVariables(cssText) {
        const vars = {};
        const regex = /--([^:]+):\s*([^;]+);/g;
        let match;
        
        while ((match = regex.exec(cssText)) !== null) {
            const [, name, value] = match;
            vars[name.trim()] = value.trim();
            
            if (name.includes('box-sh')) {
                const rgbaMatch = value.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
                if (rgbaMatch) {
                    const opacity = parseFloat(rgbaMatch[4]);
                    const r = parseInt(rgbaMatch[1]);
                    const g = parseInt(rgbaMatch[2]);
                    const b = parseInt(rgbaMatch[3]);
                    const hex = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
                    
                    if (name.includes('char')) {
                        vars['char-box-sh-color'] = hex;
                        vars['char-box-sh-opacity'] = opacity;
                    } else if (name.includes('user')) {
                        vars['user-box-sh-color'] = hex;
                        vars['user-box-sh-opacity'] = opacity;
                    }
                }
            }
        }
        
        return vars;
    }


    function initThemeModal() {
        const modal = document.getElementById('themeModal');
        const openBtn = document.querySelector('.theme-preview-btn');
        const closeBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
        const previewBtn = modal.querySelector('.preview-theme-btn');
        const themeInput = modal.querySelector('.theme-input');
    
        openBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'none';
                themeInput.value = '';
            });
        });
    
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                themeInput.value = '';
            }
        });
    
        previewBtn.addEventListener('click', () => {
            const cssText = themeInput.value;
            
            try {
                const vars = parseCSSVariables(cssText);
                Object.entries(vars).forEach(([name, value]) => {
                    if (name === 'char-box-sh-color') {
                        const control = document.getElementById('charBoxShColor');
                        if (control) {
                            control.value = value;
                            const picker = control.closest('.color-picker');
                            if (picker) {
                                picker.querySelector('.color-preview').style.backgroundColor = value;
                                picker.querySelector('.color-value').textContent = value;
                            }
                        }
                    } else if (name === 'char-box-sh-opacity') {
                        const control = document.getElementById('charBoxShOpacity');
                        if (control) {
                            control.value = value;
                            const valueSpan = control.nextElementSibling;
                            if (valueSpan) {
                                valueSpan.textContent = value;
                            }
                        }
                    } else if (name === 'user-box-sh-color') {
                        const control = document.getElementById('userBoxShColor');
                        if (control) {
                            control.value = value;
                            const picker = control.closest('.color-picker');
                            if (picker) {
                                picker.querySelector('.color-preview').style.backgroundColor = value;
                                picker.querySelector('.color-value').textContent = value;
                            }
                        }
                    } else if (name === 'user-box-sh-opacity') {
                        const control = document.getElementById('userBoxShOpacity');
                        if (control) {
                            control.value = value;
                            const valueSpan = control.nextElementSibling;
                            if (valueSpan) {
                                valueSpan.textContent = value;
                            }
                        }
                    } else {
                        document.documentElement.style.setProperty(`--${name}`, value);
                        
                        const controlId = name.replace(/-./g, x => x[1].toUpperCase());
                        const control = document.getElementById(controlId);
                        if (control) {
                            if (control.type === 'color') {
                                const colorMatch = value.match(/#[0-9a-fA-F]{6}/);
                                if (colorMatch) {
                                    control.value = colorMatch[0];
                                    const picker = control.closest('.color-picker');
                                    if (picker) {
                                        picker.querySelector('.color-preview').style.backgroundColor = value;
                                        picker.querySelector('.color-value').textContent = colorMatch[0];
                                    }
                                }
                            } else if (control.type === 'range') {
                                const numMatch = value.match(/\d+/);
                                if (numMatch) {
                                    control.value = numMatch[0];
                                    const valueSpan = control.nextElementSibling;
                                    if (valueSpan) {
                                        valueSpan.textContent = value;
                                    }
                                }
                            }
                        }
                    }
                });
                
                modal.style.display = 'none';
                themeInput.value = '';
                
                const toast = document.querySelector('.toast1');
                toast.textContent = 'Theme applied successfully!';
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                    toast.textContent = 'CSS copied to clipboard!';
                }, 2000);
            } catch (error) {
                console.error('Failed to parse CSS:', error);
                const toast = document.querySelector('.toast1');
                toast.textContent = 'Invalid CSS format!';
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                    toast.textContent = 'CSS copied to clipboard!';
                }, 2000);
            }
        });
    }

    initColorPickers();
    initRangeSliders();
    initThemeDropdown();
    initInteractionButtons();
    initCopyButton();
    initCopyHTMLButton()
    initThemeModal();

    applyTheme(themes.dark);
});