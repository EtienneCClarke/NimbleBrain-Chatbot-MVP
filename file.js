// Inject chatbot when webpage has loaded
window.addEventListener("load", (e) => {
    
    // Get params such as api keys
    const params = getScriptParams();
    console.log(params);

    // Start adding elements to page
    addCircle(50);
});

function getScriptParams() {

    // Id assigned to <script> tag.
    let script = document.getElementById('file-js');
    return {
        api_key: script.getAttribute('data-api-key') || undefined
    }
}

function addCircle(radius) {

    // Create new element
    const newDiv = document.createElement("div");

    // Style element
    newDiv.style.position = 'fixed';
    newDiv.style.bottom = '50px';
    newDiv.style.right = '50px';
    newDiv.style.width = `${radius}px`;
    newDiv.style.aspectRatio = '1/1';
    newDiv.style.backgroundColor = 'red';
    newDiv.style.zIndex = 100;
    newDiv.style.borderRadius = '50%';
    newDiv.style.transition = '50ms';

    // Add event behaviour
    newDiv.addEventListener('mousedown', (e) =>{
        newDiv.style.width = `${radius * 0.9}px`;
    });

    newDiv.addEventListener('mouseup', (e) => {
        newDiv.style.width = `${radius}px`;
    })
    
    newDiv.addEventListener('mouseleave', (e) => {
        newDiv.style.width = `${radius}px`;
    })

    // Append element to DOM
    document.body.appendChild(newDiv);
} 