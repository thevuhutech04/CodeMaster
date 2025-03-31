// Monaco Editor Configuration
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});

let editor;

require(['vs/editor/editor.main'], function() {
    if (document.getElementById('editor')) {
        editor = monaco.editor.create(document.getElementById('editor'), {
            value: '',
            language: 'javascript',
            theme: 'vs-dark',
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true
        });
    }
});

// Code Execution
async function executeCode() {
    const code = editor.getValue();
    const language = document.getElementById('language').value;
    const outputElement = document.getElementById('output');
    const runButton = document.getElementById('runButton');
    
    try {
        runButton.disabled = true;
        outputElement.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div></div>';
        
        const response = await fetch('/problems/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, language })
        });
        
        const result = await response.json();
        
        if (result.error) {
            outputElement.innerHTML = `<pre class="text-danger">${result.error}</pre>`;
        } else {
            outputElement.innerHTML = `<pre>${result.output}</pre>`;
        }
    } catch (error) {
        outputElement.innerHTML = `<pre class="text-danger">Error: ${error.message}</pre>`;
    } finally {
        runButton.disabled = false;
    }
}

// Copy Code
function copyCode() {
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'toast position-fixed bottom-0 end-0 m-3';
        toast.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">Success</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                Code copied to clipboard!
            </div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast after it's hidden
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    });
}

// Reset Code
function resetCode() {
    editor.setValue('');
}

// Language Change
function changeLanguage() {
    const language = document.getElementById('language').value;
    monaco.editor.setModelLanguage(editor.getModel(), language);
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}); 