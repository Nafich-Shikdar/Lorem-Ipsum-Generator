document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const paragraphsInput = document.getElementById('paragraphs');
    const typeSelect = document.getElementById('type');
    const lengthSelect = document.getElementById('length');
    const outputElement = document.getElementById('output');

    // Lorem Ipsum text sources
    const loremIpsum = {
        lorem: {
            words: [
                "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", 
                "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", 
                "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", 
                "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", 
                "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", 
                "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", 
                "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "sed", "ut", 
                "perspiciatis", "unde", "omnis", "iste", "natus", "error", "sit", "voluptatem", "accusantium", "doloremque", 
                "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", 
                "veritatis", "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt", "explicabo", "nemo", 
                "enim", "ipsam", "voluptatem", "quia", "voluptas", "sit", "aspernatur", "aut", "odit", "aut", 
                "fugit", "sed", "quia", "consequuntur", "magni", "dolores", "eos", "qui", "ratione", "voluptatem", 
                "sequi", "nesciunt", "neque", "porro", "quisquam", "est", "qui", "dolorem", "ipsum", "quia", 
                "dolor", "sit", "amet", "consectetur", "adipisci", "velit", "sed", "quia", "non", "numquam"
            ],
            firstSentence: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        hipster: {
            words: [
                "artisan", "aesthetic", "bitters", "brooklyn", "cardigan", "celiac", "chambray", "chillwave", "cliche", "craft", 
                "cray", "crucifix", "disrupt", "distillery", "edison", "ethical", "etsy", "farm-to-table", "fixie", "flannel", 
                "forage", "freegan", "gastropub", "gentrify", "gluten-free", "hammock", "helvetica", "hella", "humblebrag", "intelligentsia", 
                "irony", "jean", "shorts", "keytar", "kickstarter", "kinfolk", "kitsch", "kombucha", "letterpress", "lomo", 
                "marfa", "meditation", "microdosing", "migas", "mixtape", "mumblecore", "mustache", "neutra", "normcore", "organic", 
                "paleo", "palo", "santo", "pabst", "poke", "polaroid", "pop-up", "portland", "prism", "pug", 
                "raclette", "raw", "denim", "readymade", "retro", "salvia", "schlitz", "selvage", "semiotics", "shabby", 
                "chic", "shoreditch", "skateboard", "slow-carb", "small", "batch", "snackwave", "squid", "sriracha", "stumptown", 
                "subway", "tile", "sustainable", "tacos", "taiyaki", "tattooed", "taxidermy", "thundercats", "tofu", "tote", 
                "bag", "tumblr", "typewriter", "umami", "unicorn", "vape", "venmo", "vexillologist", "vice", "vinyl", 
                "vaporware", "waistcoat", "woke", "wolf", "yuccie", "yolo", "you", "probably", "haven't", "heard", 
                "of", "them", "authentic", "blue", "bottle", "bushwick", "cloud", "bread", "coloring", "book"
            ],
            firstSentence: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed."
        },
        office: {
            words: [
                "actionable", "agile", "alignment", "bandwidth", "baseline", "best", "practice", "blue", "sky", "thinking", 
                "boil", "the", "ocean", "bottom", "line", "business", "case", "circle", "back", "client", 
                "core", "competency", "customer", "centric", "deep", "dive", "deliverable", "disruptive", "drill", "down", 
                "ecosystem", "empower", "engagement", "enterprise", "fast", "track", "game", "plan", "granular", "holistic", 
                "ideate", "incentivize", "innovation", "key", "performance", "indicators", "leverage", "low", "hanging", "fruit", 
                "matrix", "mindshare", "mission", "critical", "move", "the", "needle", "offline", "on", "the", 
                "radar", "onboarding", "out", "of", "the", "box", "outsource", "paradigm", "shift", "pipeline", 
                "pivot", "proactive", "process", "push", "the", "envelope", "reach", "out", "robust", "scalable", 
                "seamless", "silo", "solution", "stakeholder", "strategic", "streamline", "synergy", "takeaway", "thought", "leadership", 
                "touch", "base", "value", "add", "vertical", "visibility", "wheelhouse", "workflow", "workspace", "world", 
                "class", "action", "item", "at", "the", "end", "of", "the", "day", "back", 
                "to", "square", "one", "ballpark", "figure", "bandwidth", "bells", "and", "whistles", "best"
            ],
            firstSentence: "Let's circle back to our actionable items and touch base on our synergistic approach to corporate deliverables."
        }
    };

    // Generate Lorem Ipsum text
    function generateLoremIpsum() {
        const paragraphCount = parseInt(paragraphsInput.value) || 5;
        const type = typeSelect.value;
        const lengthOption = lengthSelect.value;
        
        // Determine sentence count based on length option
        let sentencesPerParagraph;
        switch(lengthOption) {
            case 'short':
                sentencesPerParagraph = 3;
                break;
            case 'medium':
                sentencesPerParagraph = 5;
                break;
            case 'long':
                sentencesPerParagraph = 8;
                break;
            case 'verylong':
                sentencesPerParagraph = 12;
                break;
            default:
                sentencesPerParagraph = 5;
        }
        
        const words = loremIpsum[type].words;
        const firstSentence = loremIpsum[type].firstSentence;
        
        let result = '';
        
        for (let i = 0; i < paragraphCount; i++) {
            let paragraph = '';
            
            // First paragraph starts with the standard first sentence
            if (i === 0) {
                paragraph = firstSentence + ' ';
                
                // Add remaining sentences to the first paragraph
                for (let j = 1; j < sentencesPerParagraph; j++) {
                    paragraph += generateSentence(words) + ' ';
                }
            } else {
                // Generate all sentences for other paragraphs
                for (let j = 0; j < sentencesPerParagraph; j++) {
                    paragraph += generateSentence(words) + ' ';
                }
            }
            
            result += `<p>${paragraph.trim()}</p>`;
        }
        
        outputElement.innerHTML = result;
    }
    
    // Generate a random sentence
    function generateSentence(words) {
        // Random sentence length between 5 and 15 words
        const sentenceLength = Math.floor(Math.random() * 10) + 5;
        let sentence = '';
        
        for (let i = 0; i < sentenceLength; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            let word = words[randomIndex];
            
            // Capitalize first word of the sentence
            if (i === 0) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
            }
            
            sentence += word;
            
            // Add comma with 10% probability (but not for the last word)
            if (i < sentenceLength - 1) {
                if (Math.random() < 0.1) {
                    sentence += ',';
                }
                sentence += ' ';
            }
        }
        
        // Add period at the end
        sentence += '.';
        
        return sentence;
    }
    
    // Copy text to clipboard
    function copyToClipboard() {
        // Get text without HTML tags
        const textToCopy = outputElement.textContent;
        
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        
        // Select and copy the text
        textarea.select();
        document.execCommand('copy');
        
        // Remove the temporary textarea
        document.body.removeChild(textarea);
        
        // Show success message
        const successMsg = document.createElement('span');
        successMsg.className = 'copy-success';
        successMsg.textContent = 'Copied!';
        
        const outputHeader = document.querySelector('.output-header');
        outputHeader.appendChild(successMsg);
        
        // Show the message
        setTimeout(() => {
            successMsg.classList.add('show');
        }, 10);
        
        // Hide and remove the message after 2 seconds
        setTimeout(() => {
            successMsg.classList.remove('show');
            setTimeout(() => {
                outputHeader.removeChild(successMsg);
            }, 300);
        }, 2000);
    }
    
    // Event listeners
    generateBtn.addEventListener('click', generateLoremIpsum);
    copyBtn.addEventListener('click', copyToClipboard);
    
    // Generate initial text
    generateLoremIpsum();
});
