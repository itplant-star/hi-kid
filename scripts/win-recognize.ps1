Add-Type -AssemblyName System.Speech
try {
    $r = New-Object System.Speech.Recognition.SpeechRecognitionEngine
    $r.SetInputToDefaultAudioDevice()
    $r.LoadGrammar((New-Object System.Speech.Recognition.DictationGrammar))
    $res = $r.Recognize([TimeSpan]::FromSeconds(5))
    if ($res -and $res.Text) {
        Write-Output $res.Text
    }
} catch {
    # No audio device or timeout
}
