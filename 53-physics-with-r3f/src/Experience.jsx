import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Physics, RigidBody, Debug, CuboidCollider, BallCollider, CylinderCollider, InstancedRigidBodies } from '@react-three/rapier'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'


export default function Experience()
{
    const hamburger = useGLTF('./hamburger.glb')
    const cubeCount = 300
    // useEffect(() => {
    //     for(let i = 0; i < cubeCount; i++) {
    //         const matrix = new THREE.Matrix4()
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1, 1, 1)
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }
    // })


    const cubesTransforms = useMemo(() => {
        const positions = []
        const rotations = []
        const scales = []

        for(let i = 0; i < cubeCount; i++) {
            positions.push([
                (Math.random() - 0.5) * 8,
                6 + i * 0.2,
                (Math.random() - 0.5) * 8,
            ])

            rotations.push([
                Math.random(),
                Math.random(),
                Math.random(),
            ])

            const scale = 0.2 + Math.random() * 0.2
            scales.push([0.7, 0.7, 0.7])
        }

        return {positions, rotations, scales}
    }, [])

    const [ hitSound ] = useState(() => {
        return new Audio('./hit.mp3')
    })

    // const cube = useRef()
    const cubes = useRef()
    // const twister = useRef()

    const cubeJump = () => {
        const mass = cube.current.mass()
        cube.current.applyImpulse( {x: 0, y: 5 * mass, z: 0} )
        cube.current.applyTorqueImpulse( {x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5} )
    }

    // useFrame((state) => {
    //     const time = state.clock.getElapsedTime()

    //     const eulerRotation = new THREE.Euler(0, time * 3, 0)
    //     const quaternionRotation = new THREE.Quaternion()
    //     quaternionRotation.setFromEuler(eulerRotation)
    //     twister.current.setNextKinematicRotation(quaternionRotation)

    //     const angle = time * 0.5
    //     const x = Math.sin(angle) * 2
    //     const z = Math.cos(angle) * 2
    //     twister.current.setNextKinematicTranslation({x: x, y: -0.8, z: z})
    // })

    const collisionEnter = () => {
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    return <>

        <Perf position="top-right" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics gravity={[, -9.8, 0]}>
            {/* <Debug /> */}

            {/* <RigidBody colliders='ball' position={ [ -1.5, 2, 0 ] }>
                <mesh  castShadow>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody> */}

            {/* <RigidBody colliders={false} position={[0, 1, 0]} rotation={[Math.PI * 0.4, 0, 0]}>
                <BallCollider args={[1.5]}/>
                <mesh castShadow >
                    <torusGeometry args={[1, 0.5, 16, 32]}/>
                    <meshStandardMaterial color="skyblue" />
                </mesh>
            </RigidBody>
             */}

            {/* <RigidBody 
                ref={cube} 
                position={[1.5, 2, 0]} 
                restitution={0.7} 
                friction={0.7} 
                colliders={false}
                onCollisionEnter={collisionEnter}
                // onCollisionExit={() => {console.log('exit');}}

            >
                <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
                <mesh castShadow onClick={ cubeJump }>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </RigidBody> */}

            <RigidBody type='fixed' friction={0} restitution={1} >
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>
             
            {/* <RigidBody
                position={[0, -0.8, 0]}
                friction={0}
                type='kinematicPosition'
                ref={twister}
            >
                <mesh castShadow scale={[0.4, 0.4, 3]}>
                    <boxGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>
            </RigidBody> */}

            {/* <RigidBody position={[0, 4, 0]} colliders={false}>
                <CylinderCollider args={[0.5, 1.25]} />
                <primitive object={hamburger.scene} scale={0.25} />
            </RigidBody> */}

            <RigidBody type='fixed' friction={0} restitution={1}>
                <CuboidCollider args={[5, 5, 0.05]} position={[0, 1, 5.05]} />
                <CuboidCollider args={[5, 5, 0.05]} position={[0, 1, -5.05]} />
                <CuboidCollider args={[0.05, 5, 5]} position={[5.05, 1, 0]} />
                <CuboidCollider args={[0.05, 5, 5]} position={[-5.05, 1, 0]} />
            </RigidBody>

            <InstancedRigidBodies
                positions={cubesTransforms.positions}
                rotations={cubesTransforms.rotations}
                scales={cubesTransforms.scales}
                colliders={false}
            >
                <BallCollider args={[1, 1, 1]}/>
                <instancedMesh castShadow ref={cubes} args={[null, null, cubeCount]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="tomato" />
                </instancedMesh>
            </InstancedRigidBodies>

        </Physics>


    </>
}