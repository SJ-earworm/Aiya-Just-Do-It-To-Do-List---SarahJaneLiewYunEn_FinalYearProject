// header settings button
document.getElementById('settingsBtn').addEventListener('click', () => {
    const settingsdropdown = document.getElementById('settingsBlock');

    // checking for the existence of 'block' style first cos settingsdropdown.style.display only checks for INLINE STYLES BRUH I NEVER KNEW
    if (settingsdropdown.style.display == 'block') {
        settingsdropdown.style.display = 'none';
        // debug
        console.log('open click');
    } else {
        settingsdropdown.style.display = 'block';
        // debug
        console.log('close click');
    }
});