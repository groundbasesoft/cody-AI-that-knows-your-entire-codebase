import * as assert from 'assert'

import * as vscode from 'vscode'

import { afterIntegrationTest, beforeIntegrationTest, getTranscript, waitUntil } from './helpers'

suite('Recipes', function () {
    this.beforeEach(() => beforeIntegrationTest())
    this.afterEach(() => afterIntegrationTest())

    test('Explain Code', async () => {
        // Open Main.java
        assert.ok(vscode.workspace.workspaceFolders)
        const mainJavaUri = vscode.Uri.parse(`${vscode.workspace.workspaceFolders[0].uri.toString()}/Main.java`)
        const textEditor = await vscode.window.showTextDocument(mainJavaUri)

        // Select the "main" method
        textEditor.selection = new vscode.Selection(5, 0, 7, 0)

        // Run the "explain" command
        await vscode.commands.executeCommand('cody.command.explain-code')

        // Check the transcript contains messages from two steps.
        let humanMessage = await getTranscript(0)
        assert.match(humanMessage.displayText || '', /^Reading Main\.java and related code\./)

        humanMessage = await getTranscript(2)
        assert.match(humanMessage.displayText || '', /^Explaining it\./)

        await waitUntil(async () => /^hello from the assistant$/.test((await getTranscript(3)).displayText || ''))
    })
})
