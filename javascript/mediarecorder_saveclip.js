v = document.querySelector('video');
r = new MediaRecorder(v.captureStream(), { mimeType: 'video/webm', audioBitsPerSecond : 128000, videoBitsPerSecond : 2500000 });
chunks=[]; r.ondataavailable = (e) => chunks.push(e.data);
b = new Blob(chunks, { type: 'video/webm' });
a = document.createElement('a');
a.href = URL.createObjectURL(b);
a.download = true;
a.click();
