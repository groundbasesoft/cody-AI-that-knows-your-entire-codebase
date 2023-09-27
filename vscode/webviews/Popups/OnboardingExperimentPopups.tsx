import React from 'react'

import { VSCodeButton } from '@vscode/webview-ui-toolkit/react'

import { Popup, PopupOpenProps } from './Popup'

import styles from './Popup.module.css'

export interface OnboardingPopupProps {
    installApp: () => void
    openApp: () => void
    reloadStatus: () => void
}

export const InstallCodyAppPopup: React.FunctionComponent<OnboardingPopupProps & PopupOpenProps> = ({
    installApp,
    isOpen,
    onDismiss,
    reloadStatus,
}) => (
    <Popup
        isOpen={isOpen}
        onDismiss={onDismiss}
        title="Install Cody App for Embeddings"
        text="You can increase the quality of Cody's chat and autocomplete by installing the Cody desktop app."
        linkText="Learn more"
        linkHref="https://docs.sourcegraph.com/cody/overview/app"
        actionButtons={
            <>
                <VSCodeButton onClick={installApp}>Install Cody App</VSCodeButton>
                <VSCodeButton onClick={reloadStatus}>Reload</VSCodeButton>
            </>
        }
    />
)

export const EmbeddingsNotFoundPopup: React.FunctionComponent<OnboardingPopupProps & PopupOpenProps> = ({
    isOpen,
    onDismiss,
    openApp,
    reloadStatus,
}) => (
    <Popup
        isOpen={isOpen}
        onDismiss={onDismiss}
        title="Embeddings Not Found"
        text="To enable embeddings, add this repository to Cody App and wait for indexing to complete."
        linkText="Learn more"
        linkHref="https://docs.sourcegraph.com/cody/overview/app#embeddings"
        actionButtons={
            <>
                <VSCodeButton onClick={openApp}>Open App</VSCodeButton>
                <VSCodeButton onClick={reloadStatus}>Reload</VSCodeButton>
            </>
        }
    />
)

export interface ProgressProps {
    filesComplete: number
    filesScheduled: number
}

export const EmbeddingsProgressPopup: React.FunctionComponent<ProgressProps & PopupOpenProps> = ({
    filesComplete,
    filesScheduled,
    isOpen,
    onDismiss,
}) => (
    <Popup
        isOpen={isOpen}
        onDismiss={onDismiss}
        title="Indexing Repository"
        text="You'll receive a notification when indexing is complete."
        progress={
            <>
                <div className={styles.progressContainer}>
                    <progress className={styles.progress} value={filesComplete} max={filesScheduled} />
                    <p>
                        {filesComplete}/{filesScheduled} files
                    </p>
                </div>
            </>
        }
    />
)
