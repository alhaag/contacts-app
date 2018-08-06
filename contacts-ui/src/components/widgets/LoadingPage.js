//third party
import React from 'react'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
// components
import PageWrapper from '../widgets/PageWrapper'


const LoadingPage = (props) => {
    return (
        <PageWrapper>
            <div style={styles.wrapper}>
                <CircularProgress id="circular-progress" />
            </div>
        </PageWrapper>
    )
}

const styles = {
    wrapper: {
        textAlign: 'center',
        padding: '60px 0',
    }
}

export default LoadingPage
