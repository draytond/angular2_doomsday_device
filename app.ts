import {
    Component,
    NgFor,
    View,
    bootstrap,
} from "angular2/angular2";

class Target {
    target: string;
    population: number;
    countdown: number;

    constructor(target, population) {
        this.target = target;
        this.population = population;
        this.countdown = 10;
    }

    delayDestruction() {
        this.countdown += 1;
        return false;
    }

    countdown() {
        setInterval(function () {
            this.countdown -= 1;
        }, 1000);
    }
}

@Component({
    selector: 'targeted-city',
    inputs: ['city']
})
@View({
    template: `
    <article>
        <div class="countdown">{{ city.countdown }}</div>
        <div class="main">
            <h2>
                {{ city.target }}
                <span>(Population: {{city.population}})</span>
            </h2>
            <ul>
                <li><a href (click)='city.delayDestruction()'>Heroic Act</a></li>
            </ul>
        </div>
    </article>
    `
})
class DoomedCity {
    city: Target
}

@Component({
    selector: 'doomsday-device'
})

@View({
    template: `
    <section class="new-link">
        <div class="control-group">
            <div><label for="target">Target:</label></div>
            <div><input name="target" #newtarget></div>
        </div>
        <div class="control-group">
            <div><label for="population">Population:</label></div>
            <div><input name="population" #newpopulation></div>
        </div>

        <button (click)="addTarget(newtarget, newpopulation)">Add Target</button>
    </section>

    <targeted-city *ng-for="#city of targets" [city]="city"></targeted-city>
    <button class="launch-btn" (click)="launchMissiles()">Launch Missiles</button>
    `,

    directives: [DoomedCity, NgFor]
})

class DoomsdayDevice {
    targets: Array<Target>;

    constructor() {
        this.targets = [
            new Target('New York', 12000000),
            new Target('Los Angeles', 11000000)
        ];
    }
    addTarget(target, population) {
        this.targets.push(new Target(target.value, population.value));
        target.value = '';
        population.value = '';
    }
    launchMissiles() {
        alert('missiles launched!');
        for (var i = 0; i < this.targets.length; i++) {
            console.log('targets? ', this.targets[i]);
            this.targets[i].countdown();
        }
    }
}

bootstrap(DoomsdayDevice);
