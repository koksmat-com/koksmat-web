'use client'

import React from 'react';
import { CodeHighlighterComponent } from "@/components/code-highlighter";

interface Section {
  title: string;
  children: React.ReactNode;
}

const ExchangeOnlineGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Exchange Online PowerShell Scripts</h1>
      <RecoveringMailboxSection title={'Recover'} ><div /></RecoveringMailboxSection>
      <ExportFutureInvitationsSection title={'Find'}><div /></ExportFutureInvitationsSection>
      <SendCancellationsSection title={'Cancel'}><div /></SendCancellationsSection>
    </div>
  );
};

const RecoveringMailboxSection: React.FC<Section> = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">1. Recovering a Mailbox</h2>
      <p className="mb-4">
        To recover a deleted mailbox on Exchange Online, use the &lsquo;Restore-Mailbox&lsquo; command after connecting to Exchange Online. Here&apos;s a sample script:
      </p>
      <CodeHighlighterComponent
        language="powershell"
        theme="vsDark"
      >
        {`# Connect to Exchange Online
$Session = Connect-ExchangeOnline -UserPrincipalName "youradmin@yourdomain.com"

# Restore deleted mailbox (replace with correct mailbox details)
Restore-Mailbox -Identity "user@yourdomain.com" -RecoveryMailbox "RecoveryMailbox@yourdomain.com" -TargetFolder "RecoveredItems"

# Disconnect the session
Disconnect-ExchangeOnline -Confirm:$false`}
      </CodeHighlighterComponent>
    </section>
  );
};

const ExportFutureInvitationsSection: React.FC<Section> = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">2. Export Future Invitations to CSV</h2>
      <p className="mb-4">
        This script finds all future invitations from the mailbox, gathering mail ID, subject, and date:
      </p>
      <CodeHighlighterComponent
        language="powershell"
        theme="vsDark"
      >
        {`# Connect to Exchange Online if not already connected
$Session = Connect-ExchangeOnline -UserPrincipalName "youradmin@yourdomain.com"

# Specify the mailbox
$mailbox = "user@yourdomain.com"

# Get future calendar items
$invitations = Get-CalendarDiagnosticLog -Identity $mailbox -Start (Get-Date) -End ([datetime]::MaxValue) | 
    Where-Object { $_.IsMeeting -eq $true -and $_.IsOrganizer -eq $true }

# Export to CSV
$csvPath = "C:\\Path\\To\\output.csv"
$invitations | Select-Object MessageId, Subject, StartTime | Export-Csv -Path $csvPath -NoTypeInformation

# Disconnect the session
Disconnect-ExchangeOnline -Confirm:$false`}
      </CodeHighlighterComponent>
    </section>
  );
};

const SendCancellationsSection: React.FC<Section> = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">3. Send Cancellations from CSV</h2>
      <p className="mb-4">
        This script reads the CSV, sends cancellation notices with a predefined HTML message, and logs the sent messages:
      </p>
      <CodeHighlighterComponent
        language="powershell"
        theme="vsDark"
      >
        {`# Connect to Exchange Online if not already connected
$Session = Connect-ExchangeOnline -UserPrincipalName "youradmin@yourdomain.com"

# CSV file path
$csvPath = "C:\\Path\\To\\output.csv"

# Load the CSV
$invitations = Import-Csv -Path $csvPath

# Define the HTML explanation message
$htmlMessage = @"
<p>Dear Recipient,</p>
<p>We regret to inform you that this meeting has been canceled. Please contact us for further details.</p>
"@

# Send cancellation notices
foreach ($invitation in $invitations) {
    $message = New-Object Microsoft.Exchange.WebServices.Data.EmailMessage
    $message.Subject = "Cancellation: $($invitation.Subject)"
    $message.Body = [Microsoft.Exchange.WebServices.Data.MessageBody]::new("HTML")
    $message.Body.Text = $htmlMessage
    $message.ToRecipients.Add("recipient@domain.com")  # Replace with actual recipient

    # Send message
    $message.SendAndSaveCopy()
}

# Disconnect the session
Disconnect-ExchangeOnline -Confirm:$false`}
      </CodeHighlighterComponent>
    </section>
  );
};

export default ExchangeOnlineGuide;