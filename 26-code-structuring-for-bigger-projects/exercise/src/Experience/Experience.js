import * as THREE from "three"
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Resources from "./Utils/Resources.js"
import Camera from "./Camera.js"
import Renderer from "./Renderer.js"
import World from "./World/World.js"
import Sources from "./Sources.js"
import Debug from "./Utils/Debug.js"

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        if(instance)
            return instance

        instance = this
        // Global acess
        window.experience = this

        // Option
        this.canvas = canvas

        // Sizes
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(Sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Sizes resize current
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                for(const key in child.material)
                {
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}

