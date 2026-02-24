/**
 * Skin Disease Detection - Logic Script
 * Handles image preview, simulation of AI analysis, and result display.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // DOM Elements
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const removeImageBtn = document.getElementById('remove-image');
    const analyzeBtn = document.getElementById('analyze-btn');
    const symptomSelect = document.getElementById('symptom');
    const resultContainer = document.getElementById('result-container');
    const placeholderResult = document.querySelector('.placeholder-result');
    const loader = document.getElementById('loader');
    const finalResult = document.getElementById('final-result');
    const resetBtn = document.getElementById('reset-btn');
    const toast = document.getElementById('toast');

    // Variables to store state
    let uploadedImage = null;

    // --- 1. Image Upload Logic ---
    
    // Click to upload
    dropZone.addEventListener('click', () => fileInput.click());

    // Handle File Input Change
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            handleFile(this.files[0]);
        }
    });

    // Drag and Drop Events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Function to handle the file
    function handleFile(file) {
        // Validate image type
        if (!file.type.startsWith('image/')) {
            showToast('Please upload a valid image file.');
            return;
        }

        uploadedImage = file;
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewContainer.style.display = 'block';
            // Hide the upload icon text
            dropZone.querySelector('h3').style.display = 'none';
            dropZone.querySelector('p').style.display = 'none';
            dropZone.querySelector('i').style.display = 'none';
        }
        
        reader.readAsDataURL(file);
    }

    // Remove Image
    removeImageBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering dropZone click
        uploadedImage = null;
        fileInput.value = ''; // Reset input
        imagePreview.src = '';
        previewContainer.style.display = 'none';
        
        // Show upload text again
        dropZone.querySelector('h3').style.display = 'block';
        dropZone.querySelector('p').style.display = 'block';
        dropZone.querySelector('i').style.display = 'block';
    });


    // --- 2. Analysis Logic ---

    analyzeBtn.addEventListener('click', () => {
        // Validation
        if (!uploadedImage) {
            showToast('Please upload an image first.');
            return;
        }
        if (symptomSelect.value === "") {
            showToast('Please select a visible symptom.');
            return;
        }

        // Start Analysis Process
        startAnalysis();
    });

    function startAnalysis() {
        // Hide previous results, show loader
        placeholderResult.classList.add('hidden');
        finalResult.classList.add('hidden');
        loader.classList.remove('hidden');
        analyzeBtn.disabled = true;
        analyzeBtn.innerText = "Analyzing...";

        // Simulate API delay (2 seconds)
        setTimeout(() => {
            generateResult();
        }, 2000);
    }

    function generateResult() {
        // Get selected symptom
        const symptom = symptomSelect.value;
        
        // Logic to determine deficiency (Simulation)
        let deficiency = {};
        
        switch(symptom) {
            case 'dry_skin':
                deficiency = {
                    name: 'Vitamin C Deficiency',
                    desc: 'Your symptoms of dry & rough skin align with a lack of Vitamin C, which is essential for collagen production and skin hydration.',
                    foods: ['Oranges', 'Lemon', 'Strawberries', 'Bell Peppers', 'Broccoli']
                };
                break;
            case 'pale_skin':
                deficiency = {
                    name: 'Vitamin B12 Deficiency',
                    desc: 'Pale skin often indicates anemia caused by low Vitamin B12, necessary for red blood cell formation.',
                    foods: ['Meat', 'Fish', 'Eggs', 'Dairy Products', 'Fortified Cereals']
                };
                break;
            case 'rashes':
                deficiency = {
                    name: 'Zinc Deficiency (often related to Vitamin D)',
                    desc: 'Recurring rashes or eczema-like conditions can be linked to Zinc deficiency or low Vitamin D levels.',
                    foods: ['Pumpkin Seeds', 'Chickpeas', 'Nuts', 'Dairy', 'Mushrooms']
                };
                break;
            case 'cracks':
                deficiency = {
                    name: 'Iron & Vitamin B Deficiency',
                    desc: 'Cracks in the corners of the mouth (Angular Cheilitis) often suggest iron deficiency or lack of B vitamins.',
                    foods: ['Spinach', 'Red Meat', 'Lentils', 'Avocado', 'Eggs']
                };
                break;
            case 'pigmentation':
                deficiency = {
                    name: 'Vitamin B12 Deficiency',