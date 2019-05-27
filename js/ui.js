document.addEventListener('DOMContentLoaded', () => {
    // nav menu
    const menus = document.querySelector('.side-menu');
    M.Sidenav.init(menus, {
        edge: 'left'
    });
    // recipe form
    const forms = document.querySelector('.side-form');
    M.Sidenav.init(forms, {
        edge: 'right'
    });
})