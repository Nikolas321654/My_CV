class MyCV {
    constructor() {
        this.queue = Promise.resolve();
        this.speed = 10;
    }

    enqueue(task) {
        this.queue = this.queue.then(() => task());
        return this.queue;
    }

    typeText(element, text) {
        return new Promise(resolve => {
            let i = 0;
            const step = () => {
                if (i <= text.length) {
                    element.textContent = text.slice(0, i);
                    i++;
                    window.scrollTo(0, document.body.scrollHeight);
                    setTimeout(step, this.speed);
                } else {
                    resolve();
                }
            };
            step();
        });
    }

    typeLinkText(anchor, text) {
        return new Promise(resolve => {
            let i = 0;
            const step = () => {
                if (i <= text.length) {
                    anchor.textContent = text.slice(0, i);
                    i++;
                    window.scrollTo(0, document.body.scrollHeight);
                    setTimeout(step, this.speed);
                } else {
                    resolve();
                }
            };
            step();
        });
    }

    addTypedParagraph(container, text) {
        return this.enqueue(async () => {
            const p = document.createElement('p');
            container.appendChild(p);
            await this.typeText(p, text);
        });
    }

    addTypedParagraphWithLink(container, staticTextBefore, linkHref, linkText, staticTextAfter = '') {
        return this.enqueue(async () => {
            const p = document.createElement('p');
            container.appendChild(p);

            const prefixSpan = document.createElement('span');
            p.appendChild(prefixSpan);
            await this.typeText(prefixSpan, staticTextBefore);

            const a = document.createElement('a');
            a.href = linkHref;
            a.target = '_blank';
            p.appendChild(a);
            await this.typeLinkText(a, linkText);

            if (staticTextAfter) {
                const suffixSpan = document.createElement('span');
                p.appendChild(suffixSpan);
                await this.typeText(suffixSpan, staticTextAfter);
            }
        });
    }

    SetButtonsWithEventListeners() {
        const moreInfoBlock = document.querySelector('.text-buttons');
        const stackButton = document.querySelector('.stack_button');
        const educationButton = document.querySelector('.education_button');
        const projectsButton = document.querySelector('.projects_button');
        const contactsButton = document.querySelector('.contacts_button');

        stackButton.addEventListener('click', () => {
            this.addTypedParagraph(moreInfoBlock, 'Frontend');
            this.addTypedParagraph(moreInfoBlock, '- JavaScript');
            this.addTypedParagraph(moreInfoBlock, '- TypeScript');
            this.addTypedParagraph(moreInfoBlock, '- CSS');
            this.addTypedParagraph(moreInfoBlock, '- HTML');

            this.addTypedParagraph(moreInfoBlock, 'Backend');
            this.addTypedParagraph(moreInfoBlock, '- ASP.NET');
            this.addTypedParagraph(moreInfoBlock, '- Framework Core');
            this.addTypedParagraph(moreInfoBlock, '- Postgres');

            this.addTypedParagraph(moreInfoBlock, 'Tools');
            this.addTypedParagraph(moreInfoBlock, '- Git');
            this.addTypedParagraph(moreInfoBlock, '- OS Windows');
            this.addTypedParagraph(moreInfoBlock, '- OS Linux');

            this.addTypedParagraph(moreInfoBlock, 'Testing');
            this.addTypedParagraph(moreInfoBlock, '- Debugging');
            this.addTypedParagraph(moreInfoBlock, '- Xunit');

            this.addTypedParagraph(moreInfoBlock, 'Other');
            this.addTypedParagraph(moreInfoBlock, '- WPF');
            this.addTypedParagraph(moreInfoBlock, '- OOP');
            this.addTypedParagraph(moreInfoBlock, '- Software architecture');
            this.addTypedParagraph(moreInfoBlock, '- Computer Systems and Networks');
            this.addTypedParagraph(moreInfoBlock, '- Math');
        });

        educationButton.addEventListener('click', () => {
            this.addTypedParagraph(moreInfoBlock, 'University');
            this.addTypedParagraph(moreInfoBlock, "- National Technical University of Ukraine 'Kyiv Polytechnic Institute'");
            this.addTypedParagraph(moreInfoBlock, '- Computer Systems Software Engineering');
            this.addTypedParagraph(moreInfoBlock, "- Bachelor's degree");
            this.addTypedParagraph(moreInfoBlock, '- 2024 – 2028');
        });

        contactsButton.addEventListener('click', () => {
            this.addTypedParagraph(moreInfoBlock, 'Contacts');
            this.addTypedParagraphWithLink(
                moreInfoBlock,
                '- Telegram: ',
                'https://t.me/Nikalas1',
                'Nikalas1'
            );
            this.addTypedParagraphWithLink(
                moreInfoBlock,
                '- linkedin: ',
                'https://www.linkedin.com/in/mykola-biliavskyi-501327381/',
                'Mykola Biliavskyi'
            );
            this.addTypedParagraphWithLink(
                moreInfoBlock,
                '- Mail: ',
                'mailto:kolia.biliavskiy@gmail.com',
                'kolia.biliavskiy@gmail.com'
            );
            this.addTypedParagraphWithLink(
                moreInfoBlock,
                '- Github: ',
                'https://github.com/Nikolas321654',
                'github.com/Nikolas321654'
            );
        });

        projectsButton.addEventListener('click', () => {
            this.addTypedParagraph(moreInfoBlock, 'Projects');
            this.addTypedParagraphWithLink(
                moreInfoBlock,
                '- Hooli_Commander: ',
                'https://github.com/Nikolas321654/Hooli_Commander',
                'github.com/Nikolas321654/Hooli_Commander'
            );
            this.addTypedParagraphWithLink(
                moreInfoBlock,
                '- Hooli_Music: ',
                'https://github.com/Nikolas321654/Hooli_Music',
                'github.com/Nikolas321654/Hooli_Music'
            );
        });
    }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const classMyCv = new MyCV();
        classMyCv.SetButtonsWithEventListeners();

        // Початковий тайпінг головного опису
        const mainInfo = document.querySelector('.main-info');
        if (mainInfo) {
            const paragraphs = Array.from(mainInfo.querySelectorAll('p'));
            // Зчитати тексти, очистити та надрукувати по черзі
            const texts = paragraphs.map(p => p.textContent || '');
            paragraphs.forEach(p => (p.textContent = ''));
            texts.forEach((t, idx) => {
                const p = paragraphs[idx];
                classMyCv.enqueue(() => classMyCv.typeText(p, t));
            });
        }
    });
}