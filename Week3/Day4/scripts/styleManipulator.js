// styleManipulator.js
class StyleManipulator {
    // Method to show loading spinner
    static showLoadingSpinner() {
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';
    }

    // Method to hide loading spinner
    static hideLoadingSpinner() {
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'none';
    }

    // Method to highlight an element temporarily (e.g., on success/failure)
    static highlightElement(element, color = 'yellow') {
        element.style.backgroundColor = color;
        setTimeout(() => {
            element.style.backgroundColor = '';
        }, 500);
    }
}
