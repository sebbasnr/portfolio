interface TOCHeader {
  element: HTMLElement;
  link: HTMLAnchorElement;
}

export function setupTOC() {
  const links = document.querySelectorAll<HTMLAnchorElement>('.toc-link');
  const headers: TOCHeader[] = [];
  
  links.forEach(link => {
    const targetId = link.getAttribute('href')?.substring(1);
    if (!targetId) return;
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      headers.push({
        element: targetElement,
        link: link
      });
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const targetId = entry.target.id;
      const tocLink = document.querySelector(`.toc-link[href="#${targetId}"]`);
      if (entry.isIntersecting) {
        document.querySelectorAll('.toc-link').forEach(link => {
          link.classList.remove('active');
        });
        tocLink?.classList.add('active');
      }
    });
  }, {
    rootMargin: '0px 0px -50% 0px',
    threshold: 0.1
  });

  headers.forEach(header => {
    observer.observe(header.element);
  });

  document.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (!targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: (targetElement as HTMLElement).offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
      document.querySelectorAll('.toc-link').forEach(link => {
        link.classList.remove('active');
      });
    }
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', setupTOC);
}
