
/**
 * Task 1
 */
function leafFiles(files) {
    const leafFiles = [];
    const parentFileID = [];

    // Find all parent files
    files.forEach(file => {
        if (!parentFileID.includes(file.parent)) {
            parentFileID.push(file.parent);
        }
    });

    // If ID not in parent file, add to leafFiles
    files.forEach(file => {
        if (!parentFileID.includes(file.id)) {
            leafFiles.push(file.name);
        }
    });

    return leafFiles;
}

/**
 * Task 1
 */
function kLargestCategories(files, k) {

    const categoryCount = {};

    // Count number of files in each category
    files.forEach(file => {
        file.categories.forEach(category => {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        });
    });

    // Sort category in descending order
    const sortedCategories = Object.keys(categoryCount).sort((a, b) => {
        const countCompare = categoryCount[b] - categoryCount[a];
        // If same amount, sort alphabetically
        return countCompare !== 0 ? countCompare : a.localeCompare(b);
    });

    // Return the first k categories
    return sortedCategories.slice(0, k);
}

/**
 * Task 1
 */
function largestFileSize(files) {
    let largestSize = 0;
    const parentFiles = [];

    // Find all parent files
    files.forEach(file => {
        if (!parentFiles.includes(file.parent)) {
            parentFiles.push(file);
        }
    });

    // Find the largest parent
    parentFiles.forEach(file => {
        const fileSize = parentFileSize(files, file.id);
        if (fileSize > largestSize) {
            largestSize = fileSize;
        }
    });
    
    return largestSize;
}

function parentFileSize(files, parentId) {
    const leafFiles = files.filter(file => file.parent === parentId);
    let totalSize = files.find(file => file.id === parentId).size;

    // If we reach a leaf node, return size
    if (leafFiles.length === 0) {
        return totalSize;
    }

    // Accumulate size of leaf nodes
    leafFiles.forEach(file => {
        totalSize += parentFileSize(files, file.id);
    });

    return totalSize;
}


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));

console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

console.assert(largestFileSize(testFiles) == 20992)
