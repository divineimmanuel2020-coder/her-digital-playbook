/**
 * tools.js – Free Tools Controller
 * ------------------------------------------------------------
 * Manages interactive functionality for the Free Tools section
 * of Her Digital Playbook. All tools are free and purely
 * client-side calculators, checklists, and validators.
 */

'use strict';

(function() {
    // =============================================
    // PUBLIC INITIALIZATION
    // =============================================

    /**
     * Initialize all free tools.
     * Called by main.js when the DOM is ready.
     */
    window.initTools = function() {
        // Initialize each tool if its container exists
        initSalaryCalculator();
        initFreelanceCalculator();
        initResumeChecklist();
        initPromptBuilder();
        initBusinessValidator();
        initBudgetPlanner();

        console.log('Tools: Initialized.');
    };

    // =============================================
    // TOOL 1: SALARY NEGOTIATION CALCULATOR
    // =============================================

    /**
     * Initializes the Salary Negotiation Calculator.
     * Calculates suggested salary range based on industry and experience.
     */
    function initSalaryCalculator() {
        const container = document.getElementById('salary-calculator');
        if (!container) return;

        const form = container.querySelector('form');
        const industrySelect = container.querySelector('#industry');
        const experienceSelect = container.querySelector('#experience');
        const resultDisplay = container.querySelector('#salary-result');
        const resetBtn = container.querySelector('.reset-btn');

        if (!form || !industrySelect || !experienceSelect || !resultDisplay) {
            console.warn('Salary Calculator: Missing required elements.');
            return;
        }

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const industry = industrySelect.value;
            const experience = experienceSelect.value;

            if (!industry || !experience) {
                showError(resultDisplay, 'Please select both industry and experience level.');
                return;
            }

            // Placeholder calculation (to be replaced with actual logic)
            const baseSalary = getBaseSalary(industry);
            const multiplier = getExperienceMultiplier(experience);
            const suggestedMin = Math.round(baseSalary * multiplier * 0.9);
            const suggestedMax = Math.round(baseSalary * multiplier * 1.1);

            resultDisplay.textContent = `Suggested range: $${suggestedMin.toLocaleString()} – $${suggestedMax.toLocaleString()}`;
            resultDisplay.classList.remove('error');
            resultDisplay.classList.add('success');
        });

        // Reset form
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                form.reset();
                resultDisplay.textContent = '';
                resultDisplay.className = '';
            });
        }
    }

    /**
     * Placeholder for industry base salary.
     * @param {string} industry - The selected industry.
     * @returns {number} Base salary.
     */
    function getBaseSalary(industry) {
        // Replace with real data or API
        const salaries = {
            'technology': 90000,
            'finance': 85000,
            'marketing': 70000,
            'design': 75000,
            'healthcare': 80000,
            'education': 65000,
            'other': 70000
        };
        return salaries[industry] || 70000;
    }

    /**
     * Placeholder for experience multiplier.
     * @param {string} experience - The selected experience level.
     * @returns {number} Multiplier.
     */
    function getExperienceMultiplier(experience) {
        const multipliers = {
            'entry': 0.8,
            'mid': 1.0,
            'senior': 1.2,
            'lead': 1.4,
            'executive': 1.6
        };
        return multipliers[experience] || 1.0;
    }

    // =============================================
    // TOOL 2: FREELANCE RATE CALCULATOR
    // =============================================

    /**
     * Initializes the Freelance Rate Calculator.
     * Calculates hourly and project rates based on desired annual income.
     */
    function initFreelanceCalculator() {
        const container = document.getElementById('freelance-calculator');
        if (!container) return;

        const form = container.querySelector('form');
        const annualInput = container.querySelector('#annual-income');
        const hoursInput = container.querySelector('#weekly-hours');
        const weeksInput = container.querySelector('#weeks-per-year');
        const resultDisplay = container.querySelector('#freelance-result');
        const resetBtn = container.querySelector('.reset-btn');

        if (!form || !annualInput || !hoursInput || !weeksInput || !resultDisplay) {
            console.warn('Freelance Calculator: Missing required elements.');
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const annual = parseFloat(annualInput.value);
            const hours = parseFloat(hoursInput.value) || 40;
            const weeks = parseFloat(weeksInput.value) || 48;

            if (!annual || annual <= 0) {
                showError(resultDisplay, 'Please enter a valid annual income.');
                return;
            }

            if (hours <= 0 || weeks <= 0) {
                showError(resultDisplay, 'Please enter valid hours and weeks.');
                return;
            }

            const hourlyRate = annual / (hours * weeks);
            const projectRate = hourlyRate * 40; // approximate for a full week

            resultDisplay.innerHTML = `
                <strong>Hourly Rate:</strong> $${hourlyRate.toFixed(2)}<br>
                <strong>Weekly Project Rate (40h):</strong> $${projectRate.toFixed(2)}
            `;
            resultDisplay.classList.remove('error');
            resultDisplay.classList.add('success');
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                form.reset();
                resultDisplay.innerHTML = '';
                resultDisplay.className = '';
            });
        }
    }

    // =============================================
    // TOOL 3: RESUME REVIEW CHECKLIST
    // =============================================

    /**
     * Initializes the Resume Review Checklist.
     * Provides an interactive checklist with scoring.
     */
    function initResumeChecklist() {
        const container = document.getElementById('resume-checklist');
        if (!container) return;

        const checklistItems = container.querySelectorAll('.checklist-item input[type="checkbox"]');
        const scoreDisplay = container.querySelector('#resume-score');
        const resetBtn = container.querySelector('.reset-btn');

        if (!checklistItems.length || !scoreDisplay) {
            console.warn('Resume Checklist: Missing required elements.');
            return;
        }

        function updateScore() {
            let total = 0;
            checklistItems.forEach(function(item) {
                if (item.checked) total++;
            });
            const percent = Math.round((total / checklistItems.length) * 100);
            scoreDisplay.textContent = `Score: ${percent}%`;
            scoreDisplay.className = percent >= 70 ? 'success' : 'error';
        }

        checklistItems.forEach(function(item) {
            item.addEventListener('change', updateScore);
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                checklistItems.forEach(function(item) {
                    item.checked = false;
                });
                updateScore();
            });
        }

        // Initial score
        updateScore();
    }

    // =============================================
    // TOOL 4: AI PROMPT BUILDER
    // =============================================

    /**
     * Initializes the AI Prompt Builder.
     * Generates a structured prompt based on user inputs.
     */
    function initPromptBuilder() {
        const container = document.getElementById('prompt-builder');
        if (!container) return;

        const form = container.querySelector('form');
        const topicInput = container.querySelector('#prompt-topic');
        const toneSelect = container.querySelector('#prompt-tone');
        const lengthSelect = container.querySelector('#prompt-length');
        const resultDisplay = container.querySelector('#prompt-result');
        const copyBtn = container.querySelector('.copy-btn');
        const resetBtn = container.querySelector('.reset-btn');

        if (!form || !topicInput || !toneSelect || !lengthSelect || !resultDisplay) {
            console.warn('Prompt Builder: Missing required elements.');
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const topic = topicInput.value.trim();
            const tone = toneSelect.value;
            const length = lengthSelect.value;

            if (!topic) {
                showError(resultDisplay, 'Please enter a topic.');
                return;
            }

            // Generate a placeholder prompt (to be enhanced with real AI)
            const prompt = generatePrompt(topic, tone, length);
            resultDisplay.textContent = prompt;
            resultDisplay.className = 'success';
        });

        // Copy to clipboard
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const text = resultDisplay.textContent;
                if (!text || text === '') return;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(function() {
                        showSuccess(copyBtn, 'Copied!');
                    }).catch(function() {
                        fallbackCopy(text);
                    });
                } else {
                    fallbackCopy(text);
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                form.reset();
                resultDisplay.textContent = '';
                resultDisplay.className = '';
            });
        }
    }

    /**
     * Generates a simple prompt structure.
     * @param {string} topic - The main subject.
     * @param {string} tone - Desired tone.
     * @param {string} length - Desired length.
     * @returns {string} The generated prompt.
     */
    function generatePrompt(topic, tone, length) {
        const tones = {
            'professional': 'in a professional, authoritative manner',
            'creative': 'with creative flair and originality',
            'casual': 'in a friendly, conversational tone',
            'technical': 'with technical precision and detail'
        };
        const lengths = {
            'short': 'a concise summary (100 words)',
            'medium': 'a balanced explanation (300 words)',
            'long': 'a comprehensive deep dive (600 words)'
        };

        const tonePhrase = tones[tone] || 'in a clear and engaging way';
        const lengthPhrase = lengths[length] || 'a well-structured response';

        return `Write ${lengthPhrase} about "${topic}" ${tonePhrase}. Include key points, examples, and actionable insights.`;
    }

    /**
     * Fallback copy method using document.execCommand.
     * @param {string} text - Text to copy.
     */
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showSuccess(copyBtn, 'Copied!');
        } catch (err) {
            showError(copyBtn, 'Copy failed.');
        }
        document.body.removeChild(textarea);
    }

    // =============================================
    // TOOL 5: BUSINESS IDEA VALIDATOR
    // =============================================

    /**
     * Initializes the Business Idea Validator.
     * Scores a business idea based on simple criteria.
     */
    function initBusinessValidator() {
        const container = document.getElementById('business-validator');
        if (!container) return;

        const form = container.querySelector('form');
        const ideaInput = container.querySelector('#business-idea');
        const problemInput = container.querySelector('#problem-solved');
        const marketInput = container.querySelector('#market-size');
        const resultDisplay = container.querySelector('#validation-result');
        const resetBtn = container.querySelector('.reset-btn');

        if (!form || !ideaInput || !problemInput || !marketInput || !resultDisplay) {
            console.warn('Business Validator: Missing required elements.');
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const idea = ideaInput.value.trim();
            const problem = problemInput.value.trim();
            const market = marketInput.value.trim();

            if (!idea || !problem || !market) {
                showError(resultDisplay, 'Please fill in all fields.');
                return;
            }

            // Simple scoring (placeholder)
            let score = 0;
            if (idea.length > 10) score += 20;
            if (problem.length > 10) score += 30;
            if (market.length > 5) score += 30;
            // Randomize a bit for realism
            score += Math.floor(Math.random() * 20);

            const finalScore = Math.min(100, score);
            let verdict = '';
            if (finalScore >= 80) verdict = '✨ Promising idea! Consider pursuing.';
            else if (finalScore >= 60) verdict = '🧐 Good potential, but refine further.';
            else if (finalScore >= 40) verdict = '🤔 Needs more work. Market research may help.';
            else verdict = '💡 Re-evaluate; consider pivoting.';

            resultDisplay.innerHTML = `
                <strong>Score:</strong> ${finalScore}/100<br>
                <strong>Verdict:</strong> ${verdict}
            `;
            resultDisplay.className = finalScore >= 60 ? 'success' : 'error';
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                form.reset();
                resultDisplay.innerHTML = '';
                resultDisplay.className = '';
            });
        }
    }

    // =============================================
    // TOOL 6: PERSONAL BUDGET PLANNER
    // =============================================

    /**
     * Initializes the Personal Budget Planner.
     * Tracks income and expenses with a simple table.
     */
    function initBudgetPlanner() {
        const container = document.getElementById('budget-planner');
        if (!container) return;

        const form = container.querySelector('form');
        const descriptionInput = container.querySelector('#budget-description');
        const amountInput = container.querySelector('#budget-amount');
        const typeSelect = container.querySelector('#budget-type');
        const listContainer = container.querySelector('#budget-list');
        const totalDisplay = container.querySelector('#budget-total');
        const resetBtn = container.querySelector('.reset-btn');

        if (!form || !descriptionInput || !amountInput || !typeSelect || !listContainer || !totalDisplay) {
            console.warn('Budget Planner: Missing required elements.');
            return;
        }

        // Store items
        let items = [];

        function renderItems() {
            listContainer.innerHTML = '';
            let total = 0;
            items.forEach(function(item, index) {
                const row = document.createElement('div');
                row.className = 'budget-item';
                row.innerHTML = `
                    <span>${item.description}</span>
                    <span>${item.type === 'income' ? '+' : '-'}$${item.amount.toFixed(2)}</span>
                    <button class="remove-item" data-index="${index}">×</button>
                `;
                listContainer.appendChild(row);
                total += item.type === 'income' ? item.amount : -item.amount;
            });
            totalDisplay.textContent = `$${total.toFixed(2)}`;
            totalDisplay.className = total >= 0 ? 'success' : 'error';

            // Attach remove handlers
            listContainer.querySelectorAll('.remove-item').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const idx = parseInt(this.dataset.index, 10);
                    items.splice(idx, 1);
                    renderItems();
                });
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const description = descriptionInput.value.trim();
            const amount = parseFloat(amountInput.value);
            const type = typeSelect.value;

            if (!description) {
                showError(descriptionInput, 'Please enter a description.');
                return;
            }
            if (!amount || amount <= 0) {
                showError(amountInput, 'Please enter a valid amount.');
                return;
            }

            items.push({ description, amount, type });
            renderItems();
            form.reset();
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                items = [];
                renderItems();
                form.reset();
            });
        }
    }

    // =============================================
    // REUSABLE HELPER FUNCTIONS
    // =============================================

    /**
     * Displays an error message on a target element.
     * @param {HTMLElement} target - The element to display the message in.
     * @param {string} message - The error message.
     */
    function showError(target, message) {
        if (typeof target === 'string') {
            target = document.querySelector(target);
        }
        if (!target) return;
        target.textContent = message;
        target.className = 'error';
    }

    /**
     * Displays a success message on a target element.
     * @param {HTMLElement} target - The element to display the message in.
     * @param {string} message - The success message.
     */
    function showSuccess(target, message) {
        if (typeof target === 'string') {
            target = document.querySelector(target);
        }
        if (!target) return;
        target.textContent = message;
        target.className = 'success';
    }

    /**
     * Formats a number as currency.
     * @param {number} value - The number to format.
     * @param {string} locale - Locale string (default: 'en-US').
     * @param {string} currency - Currency code (default: 'USD').
     * @returns {string} Formatted currency string.
     */
    function formatCurrency(value, locale, currency) {
        locale = locale || 'en-US';
        currency = currency || 'USD';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(value);
    }

    /**
     * Resets a form and clears associated result elements.
     * @param {HTMLFormElement} form - The form to reset.
     * @param {HTMLElement|string} resultElement - The result display element.
     */
    function reset
