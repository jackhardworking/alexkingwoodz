// app.js
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 独立动画触发器
    const images = document.querySelectorAll('#render-images img');
    images.forEach((img) => {
        gsap.from(img, {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "power2.out",
            scrollTrigger: {
                trigger: img,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 其他部分的滚动动画
    const sections = [
        ".video-overlay, #video-section h2",
        "#form-section form",
        "#offer-section h2 .highlight",
        "#offer-section button",
        "#second-form-section form",
        "#location-section"
    ];

    sections.forEach(section => {
        gsap.from(section, {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 移动下载按钮
    const downloadButton = document.createElement('button');
    downloadButton.textContent = "立即 E-book ！";
    downloadButton.classList.add('download-button');
    downloadButton.onclick = () => {
        const targetSection = document.getElementById('second-form-section');
        if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    };
    document.body.appendChild(downloadButton);

    // 修改下载按钮的动画
    gsap.to(downloadButton, {
        y: -30,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        repeatDelay: 0.5
    });

    // 表单提交处理
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // 阻止表单默认提交行为

            const formData = new FormData(form);

            fetch('submit.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // 表单提交成功，下载 PDF 文件
                    alert('表单提交成功！');
                    const url = 'tryme.pdf'; // PDF 文件的路径
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'tryme.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                } else {
                    alert('表单提交失败，请重试。');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('提交过程中发生错误，请重试。');
            });
        });
    });
});