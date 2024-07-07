import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 4, 2, 6 ]
        } }
    >
        <Experience />
    </Canvas>
)

const root1 = ReactDOM.createRoot(document.querySelector('#root1'))

root1.render(
    <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 4, 2, 6 ]
        } }
    >
        <Experience />
    </Canvas>
)