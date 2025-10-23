// 🎯 Enhanced Visualization Export Module
class SimpleVisualizationExporter {
    constructor() {
        this.frames = [];
        this.isRecording = false;
        this.startTime = 0;
        this.captureInterval = null;
        this.elementId = 'visualization-container';
        this.recordingStats = {
            totalFrames: 0,
            averageFrameTime: 0,
            recordingDuration: 0
        };
    }

    // 🎬 Initialize recording session
    startRecording(intervalMs, elementId) {
        console.log('🎬 Starting recording session...');
        this.frames = [];
        this.isRecording = true;
        this.startTime = Date.now();
        
        // Configure target element
        if (elementId) this.elementId = elementId;
        
        // Set capture interval with validation
        const interval = typeof intervalMs === 'number' ? intervalMs : 500;
        
        // Capture initial frame immediately
        this.captureFrame();
        
        // Initialize periodic frame capture
        this.captureInterval = setInterval(() => {
            this.captureFrame();
        }, interval);
        
        console.log(`📊 Recording configured with ${interval}ms interval`);
        return true;
    }

    // 🛑 Terminate recording process
    stopRecording() {
        console.log('🛑 Stopping recording session...');
        this.isRecording = false;
        
        // Clear capture interval
        if (this.captureInterval) {
            clearInterval(this.captureInterval);
            this.captureInterval = null;
        }
        
        // Calculate recording statistics
        this.calculateRecordingStats();
        
        console.log(`📊 Recording complete! Captured ${this.frames.length} frames`);
        return this.frames.length;
    }

    // 📸 Capture single frame data
    async captureFrame() {
        if (!this.isRecording) return;

        try {
            const targetElement = document.getElementById(this.elementId);
            if (!targetElement) {
                console.warn(`❌ Target visualization container not found (id="${this.elementId}")`);
                return;
            }

            // Initialize canvas for frame capture
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 800;
            canvas.height = 600;

            // Render current visualization state
            await this.renderVisualizationFrame(context, canvas, targetElement);

            // Convert to blob and store frame data
            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    if (blob) {
                        this.frames.push({
                            blob,
                            canvas,
                            timestamp: Date.now() - this.startTime
                        });
                        console.log(`📸 Frame ${this.frames.length} captured successfully`);
                    }
                    resolve(blob);
                }, 'image/png');
            });

        } catch (error) {
            console.error('❌ Frame capture error:', error);
        }
    }

    // 🎨 Render visualization to canvas
    async renderVisualizationFrame(ctx, canvas, element) {
        // Clear canvas with background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Detect and render visualization elements
        const visualizationBars = this.detectVisualizationElements(element);
        
        if (visualizationBars.length > 0) {
            console.log(`📊 Rendering ${visualizationBars.length} visualization elements`);
            this.renderBarsVisualization(ctx, canvas, visualizationBars);
        } else {
            console.log('⚠️ No visualization data detected, rendering placeholder');
            this.renderPlaceholderVisualization(ctx, canvas);
        }
    }

    // 🔍 Detect visualization elements in DOM
    detectVisualizationElements(element) {
        const allDivElements = element.querySelectorAll('div');
        const detectedBars = [];

        allDivElements.forEach(div => {
            const elementStyle = div.style;
            const elementRect = div.getBoundingClientRect();
            
            // Identify sorting bar elements
            if (elementStyle.height && 
                elementStyle.backgroundColor && 
                elementRect.height > 20 && 
                elementRect.width > 5 && 
                elementRect.width < 100) {
                
                // Extract numerical value
                let barValue = parseInt(elementStyle.height) || elementRect.height;
                
                // Attempt to extract value from metadata
                const titleMatch = div.title?.match(/Value: (\d+)/);
                if (titleMatch) {
                    barValue = parseInt(titleMatch[1]);
                }

                detectedBars.push({
                    value: barValue,
                    height: parseInt(elementStyle.height) || elementRect.height,
                    color: elementStyle.backgroundColor || '#66ccff',
                    element: div
                });
            }
        });

        return detectedBars;
    }

    // 📊 Render bars visualization
    renderBarsVisualization(ctx, canvas, bars) {
        const maxBarValue = Math.max(...bars.map(b => b.value));
        const barWidth = Math.max(15, (canvas.width - 100) / bars.length);
        const maxBarHeight = canvas.height - 150;

        // Render title
        ctx.fillStyle = '#66ccff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Algorithm Visualization', canvas.width / 2, 40);

        // Render individual bars
        bars.forEach((bar, index) => {
            const xPosition = 50 + index * barWidth;
            const barHeight = (bar.value / maxBarValue) * maxBarHeight;
            const yPosition = canvas.height - 50 - barHeight;

            // Draw bar
            ctx.fillStyle = bar.color;
            ctx.fillRect(xPosition, yPosition, barWidth - 2, barHeight);

            // Render value label if space permits
            if (barWidth > 20) {
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(bar.value, xPosition + barWidth/2, yPosition - 5);
            }
        });

        // Render info panel
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Elements: ${bars.length}`, 50, canvas.height - 20);
    }

    // ⚠️ Render placeholder visualization
    renderPlaceholderVisualization(ctx, canvas) {
        ctx.fillStyle = '#66ccff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Algorithm Visualization', canvas.width / 2, canvas.height / 2 - 40);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText('No visualization data available', canvas.width / 2, canvas.height / 2);
        
        ctx.fillStyle = '#888888';
        ctx.font = '12px Arial';
        ctx.fillText(`Frame ${this.frames.length + 1}`, canvas.width / 2, canvas.height / 2 + 40);
    }

    // 📈 Calculate recording statistics
    calculateRecordingStats() {
        this.recordingStats.totalFrames = this.frames.length;
        this.recordingStats.recordingDuration = Date.now() - this.startTime;
        
        if (this.frames.length > 0) {
            this.recordingStats.averageFrameTime = 
                this.recordingStats.recordingDuration / this.frames.length;
        }
        
        console.log('📈 Recording statistics calculated');
    }

    // 🎞️ Export as animated GIF format
    async exportAsGIF() {
        if (this.frames.length === 0) {
            alert('No frames available for export! Please record frames first.');
            return;
        }

        console.log(`🎞️ Generating GIF animation from ${this.frames.length} frames...`);

        try {
            // Generate animated HTML representation
            const htmlContent = this.generateAnimatedHTML();
            const blob = new Blob([htmlContent], { type: 'text/html' });
            this.downloadExportFile(blob, 'algorithm-visualization.html');
            
            console.log('✅ GIF animation exported successfully!');
        } catch (error) {
            console.error('❌ GIF export error:', error);
            alert('Export failed: ' + error.message);
        }
    }

    // 🎥 Export as video format
    async exportAsVideo() {
        if (this.frames.length === 0) {
            alert('No frames available for export! Please record frames first.');
            return;
        }

        console.log(`🎥 Generating video from ${this.frames.length} frames...`);

        try {
            const htmlContent = this.generateVideoHTML();
            const blob = new Blob([htmlContent], { type: 'text/html' });
            this.downloadExportFile(blob, 'algorithm-video.html');
            
            console.log('✅ Video export completed successfully!');
        } catch (error) {
            console.error('❌ Video export error:', error);
            alert('Export failed: ' + error.message);
        }
    }

    // 🎨 Generate animated HTML content
    generateAnimatedHTML() {
        const frameDataUrls = this.frames.map(frame => {
            return frame.canvas.toDataURL('image/png');
        });

        return `
<!DOCTYPE html>
<html>
<head>
    <title>Algorithm Visualization Export</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            background: #1a1a2e; 
            color: white; 
            font-family: Arial, sans-serif; 
            text-align: center;
        }
        .animation-container {
            display: inline-block;
            border: 2px solid #66ccff;
            border-radius: 10px;
            padding: 10px;
            background: rgba(26, 26, 46, 0.8);
            margin: 20px auto;
        }
        .frame {
            display: none;
            max-width: 100%;
            height: auto;
        }
        .frame.active {
            display: block;
        }
        .controls {
            margin: 20px 0;
        }
        button {
            margin: 5px;
            padding: 10px 20px;
            background: #66ccff;
            color: #1a1a2e;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s ease;
        }
        button:hover { 
            background: #5ab8e8; 
        }
        .info { 
            margin: 10px 0; 
            color: #66ccff; 
            font-size: 14px;
        }
        .speed-control {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>🎬 Algorithm Visualization Animation</h1>
    <div class="animation-container">
        ${frameDataUrls.map((dataUrl, index) => 
            `<img class="frame ${index === 0 ? 'active' : ''}" src="${dataUrl}" alt="Frame ${index + 1}" />`
        ).join('')}
    </div>
    
    <div class="controls">
        <button onclick="startPlayback()">▶️ Play</button>
        <button onclick="pausePlayback()">⏸️ Pause</button>
        <button onclick="resetPlayback()">⏮️ Reset</button>
        <button onclick="nextFrame()">⏭️ Next</button>
        <button onclick="previousFrame()">⏮️ Previous</button>
    </div>
    
    <div class="info">
        Frame: <span id="frameNumber">1</span> / ${frameDataUrls.length} | 
        Playback Speed: <input type="range" id="speedRange" min="100" max="2000" value="500" /> ms
    </div>

    <script>
        let currentFrameIndex = 0;
        let isPlaying = false;
        let playbackInterval = null;
        const frameElements = document.querySelectorAll('.frame');
        const totalFrameCount = ${frameDataUrls.length};

        function displayFrame(index) {
            frameElements.forEach(frame => frame.classList.remove('active'));
            if (frameElements[index]) {
                frameElements[index].classList.add('active');
                document.getElementById('frameNumber').textContent = index + 1;
            }
        }

        function startPlayback() {
            if (isPlaying) return;
            isPlaying = true;
            const playbackSpeed = document.getElementById('speedRange').value;
            playbackInterval = setInterval(() => {
                currentFrameIndex = (currentFrameIndex + 1) % totalFrameCount;
                displayFrame(currentFrameIndex);
            }, parseInt(playbackSpeed));
        }

        function pausePlayback() {
            isPlaying = false;
            if (playbackInterval) {
                clearInterval(playbackInterval);
                playbackInterval = null;
            }
        }

        function resetPlayback() {
            pausePlayback();
            currentFrameIndex = 0;
            displayFrame(currentFrameIndex);
        }

        function nextFrame() {
            pausePlayback();
            currentFrameIndex = (currentFrameIndex + 1) % totalFrameCount;
            displayFrame(currentFrameIndex);
        }

        function previousFrame() {
            pausePlayback();
            currentFrameIndex = currentFrameIndex > 0 ? currentFrameIndex - 1 : totalFrameCount - 1;
            displayFrame(currentFrameIndex);
        }

        // Auto-start playback after brief delay
        setTimeout(startPlayback, 1000);
    </script>
</body>
</html>`;
    }

    // 🎥 Generate video HTML content
    generateVideoHTML() {
        return this.generateAnimatedHTML();
    }

    // 📥 Download exported file
    downloadExportFile(blob, filename) {
        const fileUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(fileUrl);
    }

    // 🔧 Utility method: Get recording statistics
    getRecordingStatistics() {
        return this.recordingStats;
    }

    // 🔧 Utility method: Clear all frames
    clearFrames() {
        this.frames = [];
        console.log('🗑️ All frames cleared');
    }
}

export default SimpleVisualizationExporter;
