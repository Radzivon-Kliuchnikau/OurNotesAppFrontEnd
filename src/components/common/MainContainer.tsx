import { Stack, styled } from '@mui/material'
import * as React from 'react'

const Container = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
}))

interface Props {
    children: React.ReactNode
}

const MainContainer: React.FC<Props> = (props: {
    children: React.ReactNode
}): React.ReactElement => {
    return <Container>{props.children}</Container>
}

export default MainContainer
