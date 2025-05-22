const quickBattleApp = createApp({
    template: `
        <div class="quick-battle">
           <div class="row">
               <div class="col-6">
                   <label for="landBattle" @click="reset()" class="btn btn-sm w-100 mb-3" :class="{ 'btn-primary': isLandBattle(), 'btn-outline-primary': isNavalBattle() }">Land Battle</label>
                   <input id="landBattle" class="d-none" type="radio" value="landBattle" v-model="battleType"/>
               </div>
               <div class="col-6">
                   <label for="navalBattle" @click="reset() "class="btn btn-sm w-100 mb-3" :class="{ 'btn-primary': isNavalBattle(), 'btn-outline-primary': isLandBattle() }">Naval Battle</label>
                   <input id="navalBattle" class="d-none" type="radio" value="navalBattle" v-model="battleType"/>
               </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-bordered align-middle">
                            <tbody>
                                <tr v-for="action in airUnits" :key="action.type">
                                    <td>
                                        <div>{{ axisForces[action.type] }}</div>
                                        <div class="slidecontainer">
                                           <input type="range" min="0" max="15" value="0" class="slider" id="myRange" v-model="axisForces[action.type]">
                                        </div>
                                    </td>
                                    
                                    <td class="ps-4">
                                      <span class="unitIcon">
                                          <img  :src="action.image">
                                          <span v-if="action.miniIcon" class="miniIcon">
                                              <img :src="action.miniIcon">
                                          </span>
                                      </span>
                                    </td>
                                    <td>
                                        <div>{{ alliedForces[action.type] }}</div>
                                        <div class="slidecontainer">
                                           <input type="range" min="0" max="15" value="0" class="slider" id="myRange" v-model="alliedForces[action.type]">
                                        </div>
                                    </td>
                                </tr>

                                <tr class="country-list">
                                    <th class="col-5">
                                      <img src="./assets/img/germany.png">
                                      <img src="./assets/img/japan.png">
                                      <img src="./assets/img/italy.png">
                                    </th>
                                    

                                    <th class="col-2">
                                        <button class="btn btn-sm btn-primary" 
                                                @click="reset()">
                                            Reset
                                        </button>
                                    </th>
                                    
                                    <th class="col-5">
                                      <img src="./assets/img/uk.png">
                                      <img src="./assets/img/ussr.png">
                                      <img src="./assets/img/usa.png">
                                      <img src="./assets/img/china.png">
                                    </th>
                                </tr>

                                <template v-if="isLandBattle()">
                                    <tr v-for="action in landUnits" :key="action.type">
                                        <td>
                                            <div>{{ axisForces[action.type] }}</div>
                                            <div class="slidecontainer">
                                               <input type="range" min="0" max="15" value="0" class="slider" id="myRange" v-model="axisForces[action.type]">
                                            </div>
                                        </td>
                                        
                                        <td class="ps-4">
                                            <span class="unitIcon">
                                                <img  :src="action.image">
                                                <span v-if="action.miniIcon" class="miniIcon">
                                                    <img :src="action.miniIcon">
                                                </span>
                                            </span>
                                        </td>
                                        
                                        <td>
                                            <div>{{ alliedForces[action.type] }}</div>
                                            <div class="slidecontainer">
                                               <input type="range" min="0" max="15" value="0" class="slider" id="myRange" v-model="alliedForces[action.type]">
                                            </div>
                                        </td>
                                    </tr>
                                </template>

                                <template v-if="isNavalBattle()">
                                    <tr v-for="action in navalUnits" :key="action.type">
                                        <td>
                                            <div>{{ axisForces[action.type] }}</div>
                                            <div class="slidecontainer">
                                               <input type="range" min="0" max="15" value="0" class="slider" id="myRange" v-model="axisForces[action.type]">
                                            </div>
                                        </td>
                                        
                                        <td class="ps-4">
                                          <span class="unitIcon">
                                              <img  :src="action.image">
                                              <span v-if="action.miniIcon" class="miniIcon">
                                                  <img :src="action.miniIcon">
                                              </span>
                                          </span>
                                        </td>
                                        
                                        <td>
                                            <div>{{ alliedForces[action.type] }}</div>
                                            <div class="slidecontainer">
                                               <input type="range" min="0" max="15" value="0" class="slider" id="myRange" v-model="alliedForces[action.type]">
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

           <template v-if="isNavalBattle()">
               <div class="row">
                   <div class="col-4">
                       <label for="axisPortAdvantage" class="btn btn-sm w-100 mb-3" :class="{ 'btn-primary': axisPortAdvantage, 'btn-outline-primary': !axisPortAdvantage }">Port Advantage</label>
                       <input id="axisPortAdvantage" class="d-none" type="checkbox" value="axisPortAdvantage" v-model="axisPortAdvantage"/>
                   </div>

                   <div class="col-4 offset-4">
                       <label for="alliedPortAdvantage" class="btn btn-sm w-100 mb-3" :class="{ 'btn-primary': alliedPortAdvantage, 'btn-outline-primary': !alliedPortAdvantage }">Port Advantage</label>
                       <input id="alliedPortAdvantage" class="d-none" type="checkbox" value="alliedPortAdvantage" v-model="alliedPortAdvantage"/>
                   </div>
               </div>
           </template>

               <div class="row">
                   <div class="col-6">
                     <div v-if="hasAlliedForces_ForceAdvantage()">No black/white</div>
                   </div>

                   <div class="col-6 text-end">
                     <div v-if="hasAxisForces_ForceAdvantage()">No black/white</div>
                   </div>
               </div>

            <!-- Power Preview -->
           <div class="container">
                <div class="bar-container">
                    <div class="bar" :style="barStyle(axisAir, alliedAir)"></div>
                    <div class="label label-left">Air Power: {{ axisAir }}</div>
                    <div class="label label-right">{{ alliedAir }} :Air Power</div>
                </div>
                <div class="bar-container">
                    <div class="bar" :style="barStyle(axisSurface, alliedSurface)"></div>
                    <div class="label label-left">Surface Power: {{ axisSurface }}</div>
                    <div class="label label-right">{{ alliedSurface }} :Surface Power</div>
                </div>
           </div>
            <br/>

            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <label for="capForceDisadvantage" class="btn btn-sm w-100 mb-3" :class="{ 'btn-primary': capForceDisadvantage, 'btn-outline-primary': !capForceDisadvantage }">Cap dices (10/20) on force disadvantage</label>
                        <input id="capForceDisadvantage" class="d-none" type="checkbox" value="capForceDisadvantage" v-model="capForceDisadvantage"/>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            airUnits: [
                { type: 'bomber_strategic', label: 'Bomber (Strategic)', image: './assets/img/bomber.png', miniIcon: './assets/img/bomb.png' },
              { type: 'bomber_air_ground', label: 'Bomber (Air/Ground)', image: './assets/img/bomber.png' },
                { type: 'fighter', label: 'Fighter', image: './assets/img/fighter.png' },
            ],
            landUnits: [
                { type: 'armor', label: 'Armor', image: './assets/img/armor.png' },
                { type: 'artillery', label: 'Artillery', image: './assets/img/artillery.png' },
                { type: 'infantry', label: 'Infantry', image: './assets/img/infantry.png' },
            ],
            navalUnits: [
                { type: 'battleship', label: 'Battleship', image: './assets/img/battleship.png' },
                { type: 'carrier', label: 'Carrier', image: './assets/img/carrier.png' },
                { type: 'cruiser', label: 'Cruiser', image: './assets/img/cruiser.png' },
                { type: 'submarine', label: 'Submarine', image: './assets/img/submarine.png' },
            ],
            // input data
            alliedForces: this.initForces(),
            axisForces: this.initForces(),
            battleType: 'landBattle',
            capForceDisadvantage: false,
            alliedPortAdvantage: false,
            axisPortAdvantage: false
        }
    },
    computed: {
        alliedAir(){
            return this.computeAir('alliedForces');
        },
        axisAir(){
            return this.computeAir('axisForces');
        },
        alliedSurface(){
            return this.computeSurface('alliedForces');
        },
        axisSurface(){
            return this.computeSurface('axisForces');
        }
    },
    mounted(){
        window.vm = this;
    },
    methods: {
        initForces() {
            return {
                bomber_strategic: 0,
                bomber_air_ground: 0,
                fighter: 0,
                armor: 0,
                artillery: 0,
                infantry: 0,
                battleship: 0,
                carrier: 0,
                cruiser: 0,
                submarine: 0,
            };
        },
        getForces(forcesName) {
          return forcesName == 'alliedForces' ? this.alliedForces : this.axisForces;
        },
        getEnemyForcesName(forcesName) {
          return forcesName == 'axisForces' ? 'alliedForces' : 'axisForces';
        },
        computeAir(forcesName) {
            var forces = this.getForces(forcesName);
            var power = 0;
            power += forces['bomber_strategic'] * 1;
            power += forces['bomber_air_ground'] * 1;
            power += forces['fighter'] * 3;
            power += forces['armor'] * 1;
            power += forces['artillery'] * 3;
            power += forces['battleship'] * 3;
            power += forces['carrier'] * 2;
            power += forces['cruiser'] * 3;
          return Math.min(power, 30);
        },
        computeSurface(forcesName) {
            var forces = this.getForces(forcesName);
            var power = 0;
            if (this.isNavalBattle() && forcesName == 'alliedForces' && this.alliedPortAdvantage){
                power += 2;
            }
            if (this.isNavalBattle() && forcesName == 'axisForces' && this.axisPortAdvantage){
                power += 2;
            }
            power += forces['bomber_air_ground'] * 4;
            power += forces['fighter'] * 3;
            power += forces['armor'] * 3;
            power += forces['artillery'] * 2;
            power += forces['infantry'] * 1;
            power += forces['battleship'] * 4;
            power += forces['carrier'] * 2;
            power += forces['cruiser'] * 3;
            power += forces['submarine'] * 2;
            if(this.capForceDisadvantage) {
              var diff = this.countSurfaceType(this.getEnemyForcesName(forcesName)) - this.countSurfaceType(forcesName);
              var cap = 30;
              if(diff == 1) cap = 20;
              else if(diff == 2) cap = 10;

              // if enemy has 1 count more than cap dices to 20
              // if enemy has 2 count more than cap dices to 10
              return Math.min(power, cap, 30);
            }
            return Math.min(power, 30);
        },
        barStyle(leftVal, rightVal) {
            const totalPower = leftVal + rightVal;

            // If both powers are equal, set bar to 50% green and 50% blue
            if (leftVal === rightVal) {
                return {
                    width: '100%',
                    background: 'linear-gradient(to right, #F44336 50%, #2196F3 50%)'
                };
            }

            // Calculate width for Player 1
            const width1 = (leftVal / totalPower) * 100;
            const width2 = 100 - width1;
            return {
                width: '100%',
                background: `linear-gradient(to right, #F44336 ${width1}%, #2196F3 ${width1}%, #2196F3 ${width2}%)`
            };
        },
        countSurfaceType(forcesName){
            var forces = this.getForces(forcesName);
            var types = 0;
            if (forces['infantry'] != 0){
                types += 1;
            }
            if (forces['artillery'] != 0){
                types += 1;
            }
            if (forces['armor'] != 0){
                types += 1;
            }
            if (forces['battleship'] != 0){
                types += 1;
            }
            if (forces['carrier'] != 0){
                types += 1;
            }
            if (forces['cruiser'] != 0){
                types += 1;
            }
            if (forces['submarine'] != 0){
                types += 1;
            }
            return types;
        },
        isLandBattle() {
          return this.battleType == "landBattle";
        },
        isNavalBattle() {
          return this.battleType == "navalBattle";
        },
        adjustUnit(alliance, action, value) {
            if (alliance == 'alliedForces') {
                this.alliedForces[action] = Math.max(value, 0);
            } else {
                this.axisForces[action] = Math.max(value, 0);
            }
        },
        hasAxisForces_ForceAdvantage() {
          return this.countSurfaceType('axisForces') > this.countSurfaceType('alliedForces')
        },
        hasAlliedForces_ForceAdvantage() {
          return this.countSurfaceType('alliedForces') > this.countSurfaceType('axisForces')
        },
        reset() {
            this.airUnits.forEach((item, index) => {
                this.axisForces[item.type] = 0;
                this.alliedForces[item.type] = 0;
            });
            this.landUnits.forEach((item, index) => {
                this.axisForces[item.type] = 0;
                this.alliedForces[item.type] = 0;
            });
            this.navalUnits.forEach((item, index) => {
                this.axisForces[item.type] = 0;
                this.alliedForces[item.type] = 0;
            });
          this.axisPortAdvantage = false;
          this.alliedPortAdvantage = false;
        }
    }
});

quickBattleApp.mount('#quick-battle');
