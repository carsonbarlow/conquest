var Conquest = (function(){


  var Kingdom = function(name){
    this.kingdom_name = name;
    // resources
    this.food = 0;
    this.wood = 0;
    this.stone = 0;
    this.gold = 0;
    // technology
    this.science = 0;
    this.mysticism = 0;
    this.favor = 0;
    // units
    this.workers = [];
    this.specialists = [];
    this.soldiers = [];
    this.heroes = [];

    this.provinces = [];
    this.tier = 1;

    this.tech_tree = new TechTree();
    this.science_building = new TechnologyBuilding('science');
    this.mysticism_building = new TechnologyBuilding('mysticism');
    this.favor_building = new TechnologyBuilding('favor');

    this.auto_food_building = new AutoResourceBuilding('food');
    this.auto_wood_building = new AutoResourceBuilding('wood');
    this.auto_stone_building = new AutoResourceBuilding('stone');
    this.auto_gold_building = new AutoResourceBuilding('gold');

    this.crafters_guild = new CraftersGuild();

  };


  var Province = function(name){
    this.province_name = name;

    //resource production
    this.food = 0.0;
    this.wood = 0.0;
    this.stone = 0.0;
    this.gold = 0.0;

    //buildings
    this.slot_1;
    this.slot_2;
    this.slot_3;

    this.construction_plans = {
      queue: [],
      assigned: []
    };

    this.defense = [];
    this.attack_plans = {};

  };


  var ResourceBuilding = function(kind){
    this.resource_type = kind;
    this.tier = 1;
    this.province; //TODO: assign province.
    this.assigned = [];
  };

  var DefensiveBuilding = function(kind){
    this.defense_type = kind;
    this.tier = 1;
    this.province; //TODO: assign province.
  };

  var TechnologyBuilding = function(kind){
    this.technology_type = kind;
    this.tier;
    this.effectiveness = 0.5;
    this.assigned = [];
  };

  var AutoResourceBuilding = function(kind){
    this.resource_type = kind;
    this.tier = 1;
  };

  var CraftersGuild = function(){
    this.tier = 1;
    this.ordered = [];
    this.purchases = [];
    this.catalog = new Catalog();
  };

  var Catalog = function(){
    this.gathering_hand_1 = true;
    this.gathering_hand_2 = false;
    this.gathering_hand_3 = false;
    // TODO: fill all this out.
  };

  var Items = function(){
    this.stock = []; //note: not too sure this is going in the right direction.
  };

  var TechTree = function(){
    this.food_level = 0;
    this.wood_level = 0;
    this.stone_level = 0;
    this.gold_level = 0;

    this.science_level = 0;
    this.mysticism_level = 0;

    this.health_level = 0;
    this.damage_level = 0;

    this.sabotage_building_level = 0;
    this.sabotage_infiltrate_level = 0;

    //TODO: make a function for each of them to level up.  It will be rather long and gangly.
  };

  var Hero = function(name){
    this.hero_name = name;
    this.level = 1;
    this.experience = 0;

    this.hand;
    this.body;
    this.accessory;

    this.health = 100;
    this.endurance = 10;
    this.intellect = 10;
    this.damage = 10;

    this.gathering = 0;
    this.construction = 0;
    this.attack = 0;
    this.defense = 0;
    this.research = 0;
    this.sabotage = 0;
  };

  var Worker = function(){
    this.endurance = this.base;
  };
  Worker.prototype.base = 10;

  var Specialist = function(){
    this.intellect = this.base;
  };
  Specialist.prototype.base = 10;

  var Soldier = function(){
    this.health = this.base_health;
    this.damage = this.base_damage;
    this.weapon;
    this.armor;
  };
  Soldier.prototype.base_health = 50;
  Soldier.prototype.base_damage = 10;

  var Equipment = function(kind){
    this.equipment_type = kind;
    this.stat_1;
    this.stat_2;
  };








  var conquest = {a:new Worker()};
  return conquest;


})();