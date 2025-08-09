// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // Get the navigation element
    const nav = document.querySelector('nav');
    // Get the logo image element
    const logoImg = nav.querySelector('img');
    // Get all menu items
    const menuItems = nav.querySelectorAll('li');
    
    // Store the original logo path
    const originalLogoPath = logoImg.src;
    // Create the path for the gradient logo by replacing the filename
    const gradientLogoPath = originalLogoPath.replace('logowhite.png', 'logogradient.png');
    
    // Function to handle scroll events
    function handleScroll() {
      // Check if page is scrolled at all
      if (window.scrollY > 0) {
        // Add white background and change text color
        nav.classList.add('bg-white');
        nav.classList.remove('text-white');
        nav.classList.add('text-black');

        nav.classList.add('shadow');
        
        // Change logo to gradient version
        logoImg.src = gradientLogoPath;
        
        // Apply gradient text effect to menu items
        menuItems.forEach(item => {
          // Remove any plain text color
          item.classList.remove('text-white');

          
          // Add gradient text effect
          item.style.background = 'linear-gradient(90deg, #8A2BE2, #FF69B4)';
          item.style.webkitBackgroundClip = 'text';
          item.style.backgroundClip = 'text';
          item.style.webkitTextFillColor = 'transparent';
          item.style.color = 'transparent';
        });
        
        // Change button appearance to match new nav style
        const contactButton = nav.querySelector('button');
        if (contactButton) {
          contactButton.classList.remove('border-white', 'text-white', 'hover:bg-white', 'hover:text-black');
          contactButton.classList.add('border-black', 'text-black', 'hover:bg-black', 'hover:text-white');
        }
      } else {
        // Reset to original transparent style
        nav.classList.remove('bg-white');
        nav.classList.remove('text-black');
        nav.classList.add('text-white');
        nav.classList.remove('shadow');
        
        // Reset logo to original version
        logoImg.src = originalLogoPath;
        
        // Reset menu items to original style
        menuItems.forEach(item => {
          // Reset styles to original
          item.style.background = '';
          item.style.webkitBackgroundClip = '';
          item.style.backgroundClip = '';
          item.style.webkitTextFillColor = '';
          item.style.color = '';
          item.classList.add('text-white');
        });
        
        // Reset button style
        const contactButton = nav.querySelector('button');
        if (contactButton) {
          contactButton.classList.remove('border-black', 'text-black', 'hover:bg-black', 'hover:text-white');
          contactButton.classList.add('border-white', 'text-white', 'hover:bg-white', 'hover:text-black');
        }
      }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call once on load to set initial state
    handleScroll();
  });