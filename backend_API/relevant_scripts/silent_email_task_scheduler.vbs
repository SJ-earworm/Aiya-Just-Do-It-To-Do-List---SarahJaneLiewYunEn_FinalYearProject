' script to turn off php.exe console pop up when Task Scheduler runs (which essentially we're running the php script from this script d)
Set PHPexeShell = CreateObject("WScript.Shell")
PHPexeShell.Run "C:\Applications\XAMPP\php\php.exe ""C:\Applications\XAMPP\htdocs\Aiya Just Do It (FYP retake)\backend_API\sendemail.php""", 0, False

' NOTE: 'C:\Applications\XAMPP\htdocs\Aiya Just Do It (FYP retake)\backend_API\sendemail.php' is passed as an argument of 'C:\Applications\XAMPP\php\php.exe' that's why it's wrapped in "" on both sides
' NOTE: '0' hides the php.exe window completely when executed
' NOTE: 'False' runs the script asynchronously (doesn't wait to finish before other processes can continue)