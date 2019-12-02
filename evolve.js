$(function(){

const global = { race: { species: ''} };
var achievementCount = featCount = 0;

$.ajaxSetup({ async: false });
let strings;
$.getJSON("strings.json", (data) => {
	strings = data;
});

function loc(key, variables) {
    let string = strings[key];
    if (!string) {
        console.error(`string ${key} not found`);
        console.log(strings);
        return key;
    }
    if (variables) {
        if(variables instanceof Array) {
            for (let i = 0; i < variables.length; i++){
                let re = new RegExp(`%${i}(?!\d)`, "g");
                if(!re.exec(string)){
                    console.error(`"%${i}" was not found in the string ${key} to be replace by "${variables[i]}"`);
                    continue;
                }
                string = string.replace(re, variables[i]);
            }
            let re = new RegExp("%\\d+(?!\\d)", 'g');
            const results = string.match(re);
            if(results){
                console.error(`${results} was found in the string, but there is no variables to make the replacement`);
            }
        }
        else{
            console.error('"variables" need be a instance of "Array"');
        }
    }
    return string;
}

var achievements = {
    apocalypse: {
        name: loc("achieve_apocalypse_name"),
        desc: loc("achieve_apocalypse_desc"),
        flair: loc("achieve_apocalypse_flair")
    },
    anarchist: {
        name: loc("achieve_anarchist_name"),
        desc: loc("achieve_anarchist_desc"),
        flair: loc("achieve_anarchist_flair")
    },
    squished: {
        name: loc("achieve_squished_name"),
        desc: loc("achieve_squished_desc"),
        flair: loc("achieve_squished_flair")
    },
    second_evolution: {
        name: loc("achieve_second_evolution_name"),
        desc: loc("achieve_second_evolution_desc"),
        flair: loc("achieve_second_evolution_flair")
    },
    blackhole: {
        name: loc("achieve_blackhole_name"),
        desc: loc("achieve_blackhole_desc"),
        flair: loc("achieve_blackhole_flair")
    },
    warmonger: {
        name: loc("achieve_warmonger_name"),
        desc: loc("achieve_warmonger_desc"),
        flair: loc("achieve_warmonger_flair")
    },
    red_tactics: {
        name: loc("achieve_red_tactics_name"),
        desc: loc("achieve_red_tactics_desc"),
        flair: loc("achieve_red_tactics_flair")
    },
    pacifist: {
        name: loc("achieve_pacifist_name"),
        desc: loc("achieve_pacifist_desc"),
        flair: loc("achieve_pacifist_flair")
    },
    madagascar_tree: {
        name: loc("achieve_madagascar_tree_name"),
        desc: loc("achieve_madagascar_tree_desc"),
        flair: loc("achieve_madagascar_tree_flair")
    },
    godwin: {
        name: loc("achieve_godwin_name"),
        desc: loc("achieve_godwin_desc"),
        flair: loc("achieve_godwin_flair")
    },
    laser_shark: {
        name: loc("achieve_laser_shark_name"),
        desc: loc("achieve_laser_shark_desc"),
        flair: loc("achieve_laser_shark_flair")
    },
    infested: {
        name: loc("achieve_infested_name"),
        desc: loc("achieve_infested_desc"),
        flair: loc("achieve_infested_flair")
    },
    mass_starvation: {
        name: loc("achieve_mass_starvation_name"),
        desc: loc("achieve_mass_starvation_desc"),
        flair: loc("achieve_mass_starvation_flair")
    },
    colonist: {
        name: loc("achieve_colonist_name"),
        desc: loc("achieve_colonist_desc"),
        flair: loc("achieve_colonist_flair",[global.race.species])
    },
    world_domination: {
        name: loc("achieve_world_domination_name"),
        desc: loc("achieve_world_domination_desc"),
        flair: loc("achieve_world_domination_flair")
    },
    illuminati: {
        name: loc("achieve_illuminati_name"),
        desc: loc("achieve_illuminati_desc"),
        flair: loc("achieve_illuminati_flair")
    },
    syndicate: {
        name: loc("achieve_syndicate_name"),
        desc: loc("achieve_syndicate_desc"),
        flair: loc("achieve_syndicate_flair")
    },
    cult_of_personality: {
        name: loc("achieve_cult_of_personality_name"),
        desc: loc("achieve_cult_of_personality_desc"),
        flair: loc("achieve_cult_of_personality_flair")
    },
    doomed: {
        name: loc("achieve_doomed_name"),
        desc: loc("achieve_doomed_desc"),
        flair: loc("achieve_doomed_flair")
    },
    pandemonium: {
        name: loc("achieve_pandemonium_name"),
        desc: loc("achieve_pandemonium_desc"),
        flair: loc("achieve_pandemonium_flair")
    },
    blood_war: {
        name: loc("achieve_blood_war_name"),
        desc: loc("achieve_blood_war_desc"),
        flair: loc("achieve_blood_war_flair")
    },
    cross: {
        name: loc("achieve_cross_name"),
        desc: loc("achieve_cross_desc"),
        flair: loc("achieve_cross_flair")
    },
    landfill: {
        name: loc("achieve_landfill_name"),
        desc: loc("achieve_landfill_desc"),
        flair: loc("achieve_landfill_flair")
    },
    seeder: {
        name: loc("achieve_seeder_name"),
        desc: loc("achieve_seeder_desc"),
        flair: loc("achieve_seeder_flair")
    },
    macro: {
        name: loc("achieve_macro_name"),
        desc: loc("achieve_macro_desc"),
        flair: loc("achieve_macro_flair")
    },
    marble: {
        name: loc("achieve_marble_name"),
        desc: loc("achieve_marble_desc"),
        flair: loc("achieve_marble_flair")
    },
    explorer: {
        name: loc("achieve_biome_explorer_name"),
        desc: loc("achieve_biome_explorer_desc"),
        flair: loc("achieve_biome_explorer_flair")
    },
    joyless: {
        name: loc("achieve_joyless_name"),
        desc: loc("achieve_joyless_desc"),
        flair: loc("achieve_joyless_flair")
    },
    biome_grassland: {
        name: loc("achieve_biome_grassland_name"),
        desc: loc("achieve_biome_grassland_desc"),
        flair: loc("achieve_biome_grassland_flair")
    },
    biome_oceanic: {
        name: loc("achieve_biome_oceanic_name"),
        desc: loc("achieve_biome_oceanic_desc"),
        flair: loc("achieve_biome_oceanic_flair")
    },
    biome_forest: {
        name: loc("achieve_biome_forest_name"),
        desc: loc("achieve_biome_forest_desc"),
        flair: loc("achieve_biome_forest_flair")
    },
    biome_desert: {
        name: loc("achieve_biome_desert_name"),
        desc: loc("achieve_biome_desert_desc"),
        flair: loc("achieve_biome_desert_flair")
    },
    biome_volcanic: {
        name: loc("achieve_biome_volcanic_name"),
        desc: loc("achieve_biome_volcanic_desc"),
        flair: loc("achieve_biome_volcanic_flair")
    },
    biome_tundra: {
        name: loc("achieve_biome_tundra_name"),
        desc: loc("achieve_biome_tundra_desc"),
        flair: loc("achieve_biome_tundra_flair")
    },
    biome_hellscape: {
        name: loc("achieve_biome_hellscape_name"),
        desc: loc("achieve_biome_hellscape_desc"),
        flair: loc("achieve_biome_hellscape_flair")
    },
    biome_eden: {
        name: loc("achieve_biome_eden_name"),
        desc: loc("achieve_biome_eden_desc"),
        flair: loc("achieve_biome_eden_flair")
    },
    creator: {
        name: loc("achieve_creator_name"),
        desc: loc("achieve_creator_desc"),
        flair: loc("achieve_creator_flair")
    },
    heavyweight: {
        name: loc("achieve_heavyweight_name"),
        desc: loc("achieve_heavyweight_desc"),
        flair: loc("achieve_heavyweight_flair")
    },
    whitehole: {
        name: loc("achieve_whitehole_name"),
        desc: loc("achieve_whitehole_desc"),
        flair: loc("achieve_whitehole_flair")
    },
    heavy: {
        name: loc("achieve_heavy_name"),
        desc: loc("achieve_heavy_desc"),
        flair: loc("achieve_heavy_flair")
    },
    canceled: {
        name: loc("achieve_canceled_name"),
        desc: loc("achieve_canceled_desc"),
        flair: loc("achieve_canceled_flair")
    },
    eviltwin: {
        name: loc("achieve_eviltwin_name"),
        desc: loc("achieve_eviltwin_desc"),
        flair: loc("achieve_eviltwin_flair")
    },
    microbang: {
        name: loc("achieve_microbang_name"),
        desc: loc("achieve_microbang_desc"),
        flair: loc("achieve_microbang_flair")
    },
    dissipated: {
        name: loc("achieve_dissipated_name"),
        desc: loc("achieve_dissipated_desc"),
        flair: loc("achieve_dissipated_flair")
    },
    genus_humanoid: {
        name: loc("achieve_genus_humanoid_name"),
        desc: loc("achieve_genus_humanoid_desc"),
        flair: loc("achieve_genus_humanoid_flair")
    },
    genus_animal: {
        name: loc("achieve_genus_animal_name"),
        desc: loc("achieve_genus_animal_desc"),
        flair: loc("achieve_genus_animal_flair")
    },
    genus_small: {
        name: loc("achieve_genus_small_name"),
        desc: loc("achieve_genus_small_desc"),
        flair: loc("achieve_genus_small_flair")
    },
    genus_giant: {
        name: loc("achieve_genus_giant_name"),
        desc: loc("achieve_genus_giant_desc"),
        flair: loc("achieve_genus_giant_flair")
    },
    genus_reptilian: {
        name: loc("achieve_genus_reptilian_name"),
        desc: loc("achieve_genus_reptilian_desc"),
        flair: loc("achieve_genus_reptilian_flair")
    },
    genus_avian: {
        name: loc("achieve_genus_avian_name"),
        desc: loc("achieve_genus_avian_desc"),
        flair: loc("achieve_genus_avian_flair")
    },
    genus_insectoid: {
        name: loc("achieve_genus_insectoid_name"),
        desc: loc("achieve_genus_insectoid_desc"),
        flair: loc("achieve_genus_insectoid_flair")
    },
    genus_plant: {
        name: loc("achieve_genus_plant_name"),
        desc: loc("achieve_genus_plant_desc"),
        flair: loc("achieve_genus_plant_flair")
    },
    genus_fungi: {
        name: loc("achieve_genus_fungi_name"),
        desc: loc("achieve_genus_fungi_desc"),
        flair: loc("achieve_genus_fungi_flair")
    },
    genus_aquatic: {
        name: loc("achieve_genus_aquatic_name"),
        desc: loc("achieve_genus_aquatic_desc"),
        flair: loc("achieve_genus_aquatic_flair")
    },
    genus_fey: {
        name: loc("achieve_genus_fey_name"),
        desc: loc("achieve_genus_fey_desc"),
        flair: loc("achieve_genus_fey_flair")
    },
    genus_heat: {
        name: loc("achieve_genus_heat_name"),
        desc: loc("achieve_genus_heat_desc"),
        flair: loc("achieve_genus_heat_flair")
    },
    genus_polar: {
        name: loc("achieve_genus_polar_name"),
        desc: loc("achieve_genus_polar_desc"),
        flair: loc("achieve_genus_polar_flair")
    },
    genus_sand: {
        name: loc("achieve_genus_sand_name"),
        desc: loc("achieve_genus_sand_desc"),
        flair: loc("achieve_genus_sand_flair")
    },
    genus_demonic: {
        name: loc("achieve_genus_demonic_name"),
        desc: loc("achieve_genus_demonic_desc"),
        flair: loc("achieve_genus_demonic_flair")
    },
    genus_angelic: {
        name: loc("achieve_genus_angelic_name"),
        desc: loc("achieve_genus_angelic_desc"),
        flair: loc("achieve_genus_angelic_flair")
    },
    atmo_toxic: {
        name: loc("achieve_atmo_toxic_name"),
        desc: loc("achieve_atmo_toxic_desc"),
        flair: loc("achieve_atmo_toxic_flair")
    },
    atmo_mellow: {
        name: loc("achieve_atmo_mellow_name"),
        desc: loc("achieve_atmo_mellow_desc"),
        flair: loc("achieve_atmo_mellow_flair")
    },
    atmo_rage: {
        name: loc("achieve_atmo_rage_name"),
        desc: loc("achieve_atmo_rage_desc"),
        flair: loc("achieve_atmo_rage_flair")
    },
    atmo_stormy: {
        name: loc("achieve_atmo_stormy_name"),
        desc: loc("achieve_atmo_stormy_desc"),
        flair: loc("achieve_atmo_stormy_flair")
    },
    atmo_ozone: {
        name: loc("achieve_atmo_ozone_name"),
        desc: loc("achieve_atmo_ozone_desc"),
        flair: loc("achieve_atmo_ozone_flair")
    },
    atmo_magnetic: {
        name: loc("achieve_atmo_magnetic_name"),
        desc: loc("achieve_atmo_magnetic_desc"),
        flair: loc("achieve_atmo_magnetic_flair")
    },
    atmo_trashed: {
        name: loc("achieve_atmo_trashed_name"),
        desc: loc("achieve_atmo_trashed_desc"),
        flair: loc("achieve_atmo_trashed_flair")
    },
    mass_extinction: {
        name: loc("achieve_mass_extinction_name"),
        desc: loc("achieve_mass_extinction_desc"),
        flair: loc("achieve_mass_extinction_flair")
    },
    vigilante: {
        name: loc("achieve_vigilante_name"),
        desc: loc("achieve_vigilante_desc"),
        flair: loc("achieve_vigilante_flair")
    },
    extinct_human: {
        name: loc("achieve_extinct_human_name"),
        desc: loc("achieve_extinct_human_desc"),
        flair: loc("achieve_extinct_human_flair")
    },
    extinct_elven: {
        name: loc("achieve_extinct_elven_name"),
        desc: loc("achieve_extinct_elven_desc"),
        flair: loc("achieve_extinct_elven_flair")
    },
    extinct_orc: {
        name: loc("achieve_extinct_orc_name"),
        desc: loc("achieve_extinct_orc_desc"),
        flair: loc("achieve_extinct_orc_flair")
    },
    extinct_cath: {
        name: loc("achieve_extinct_cath_name"),
        desc: loc("achieve_extinct_cath_desc"),
        flair: loc("achieve_extinct_cath_flair")
    },
    extinct_wolven: {
        name: loc("achieve_extinct_wolven_name"),
        desc: loc("achieve_extinct_wolven_desc"),
        flair: loc("achieve_extinct_wolven_flair")
    },
    extinct_centaur: {
        name: loc("achieve_extinct_centaur_name"),
        desc: loc("achieve_extinct_centaur_desc"),
        flair: loc("achieve_extinct_centaur_flair")
    },
    extinct_kobold: {
        name: loc("achieve_extinct_kobold_name"),
        desc: loc("achieve_extinct_kobold_desc"),
        flair: loc("achieve_extinct_kobold_flair")
    },
    extinct_goblin: {
        name: loc("achieve_extinct_goblin_name"),
        desc: loc("achieve_extinct_goblin_desc"),
        flair: loc("achieve_extinct_goblin_flair")
    },
    extinct_gnome: {
        name: loc("achieve_extinct_gnome_name"),
        desc: loc("achieve_extinct_gnome_desc"),
        flair: loc("achieve_extinct_gnome_flair")
    },
    extinct_orge: {
        name: loc("achieve_extinct_orge_name"),
        desc: loc("achieve_extinct_orge_desc"),
        flair: loc("achieve_extinct_orge_flair")
    },
    extinct_cyclops: {
        name: loc("achieve_extinct_cyclops_name"),
        desc: loc("achieve_extinct_cyclops_desc"),
        flair: loc("achieve_extinct_cyclops_flair")
    },
    extinct_troll: {
        name: loc("achieve_extinct_troll_name"),
        desc: loc("achieve_extinct_troll_desc"),
        flair: loc("achieve_extinct_troll_flair")
    },
    extinct_tortoisan: {
        name: loc("achieve_extinct_tortoisan_name"),
        desc: loc("achieve_extinct_tortoisan_desc"),
        flair: loc("achieve_extinct_tortoisan_flair")
    },
    extinct_gecko: {
        name: loc("achieve_extinct_gecko_name"),
        desc: loc("achieve_extinct_gecko_desc"),
        flair: loc("achieve_extinct_gecko_flair")
    },
    extinct_slitheryn: {
        name: loc("achieve_extinct_slitheryn_name"),
        desc: loc("achieve_extinct_slitheryn_desc"),
        flair: loc("achieve_extinct_slitheryn_flair")
    },
    extinct_arraak: {
        name: loc("achieve_extinct_arraak_name"),
        desc: loc("achieve_extinct_arraak_desc"),
        flair: loc("achieve_extinct_arraak_flair")
    },
    extinct_pterodacti: {
        name: loc("achieve_extinct_pterodacti_name"),
        desc: loc("achieve_extinct_pterodacti_desc"),
        flair: loc("achieve_extinct_pterodacti_flair")
    },
    extinct_dracnid: {
        name: loc("achieve_extinct_dracnid_name"),
        desc: loc("achieve_extinct_dracnid_desc"),
        flair: loc("achieve_extinct_dracnid_flair")
    },
    extinct_entish: {
        name: loc("achieve_extinct_entish_name"),
        desc: loc("achieve_extinct_entish_desc"),
        flair: loc("achieve_extinct_entish_flair")
    },
    extinct_cacti: {
        name: loc("achieve_extinct_cacti_name"),
        desc: loc("achieve_extinct_cacti_desc"),
        flair: loc("achieve_extinct_cacti_flair")
    },
    extinct_sporgar: {
        name: loc("achieve_extinct_sporgar_name"),
        desc: loc("achieve_extinct_sporgar_desc"),
        flair: loc("achieve_extinct_sporgar_flair")
    },
    extinct_shroomi: {
        name: loc("achieve_extinct_shroomi_name"),
        desc: loc("achieve_extinct_shroomi_desc"),
        flair: loc("achieve_extinct_shroomi_flair")
    },
    extinct_mantis: {
        name: loc("achieve_extinct_mantis_name"),
        desc: loc("achieve_extinct_mantis_desc"),
        flair: loc("achieve_extinct_mantis_flair")
    },
    extinct_scorpid: {
        name: loc("achieve_extinct_scorpid_name"),
        desc: loc("achieve_extinct_scorpid_desc"),
        flair: loc("achieve_extinct_scorpid_flair")
    },
    extinct_antid: {
        name: loc("achieve_extinct_antid_name"),
        desc: loc("achieve_extinct_antid_desc"),
        flair: loc("achieve_extinct_antid_flair")
    },
    extinct_sharkin: {
        name: loc("achieve_extinct_sharkin_name"),
        desc: loc("achieve_extinct_sharkin_desc"),
        flair: loc("achieve_extinct_sharkin_flair")
    },
    extinct_octigoran: {
        name: loc("achieve_extinct_octigoran_name"),
        desc: loc("achieve_extinct_octigoran_desc"),
        flair: loc("achieve_extinct_octigoran_flair")
    },
    extinct_dryad: {
        name: loc("achieve_extinct_dryad_name"),
        desc: loc("achieve_extinct_dryad_desc"),
        flair: loc("achieve_extinct_dryad_flair")
    },
    extinct_satyr: {
        name: loc("achieve_extinct_satyr_name"),
        desc: loc("achieve_extinct_satyr_desc"),
        flair: loc("achieve_extinct_satyr_flair")
    },
    extinct_phoenix: {
        name: loc("achieve_extinct_phoenix_name"),
        desc: loc("achieve_extinct_phoenix_desc"),
        flair: loc("achieve_extinct_phoenix_flair")
    },
    extinct_salamander: {
        name: loc("achieve_extinct_salamander_name"),
        desc: loc("achieve_extinct_salamander_desc"),
        flair: loc("achieve_extinct_salamander_flair")
    },
    extinct_yeti: {
        name: loc("achieve_extinct_yeti_name"),
        desc: loc("achieve_extinct_yeti_desc"),
        flair: loc("achieve_extinct_yeti_flair")
    },
    extinct_wendigo: {
        name: loc("achieve_extinct_wendigo_name"),
        desc: loc("achieve_extinct_wendigo_desc"),
        flair: loc("achieve_extinct_wendigo_flair")
    },
    extinct_tuskin: {
        name: loc("achieve_extinct_tuskin_name"),
        desc: loc("achieve_extinct_tuskin_desc"),
        flair: loc("achieve_extinct_tuskin_flair")
    },
    extinct_kamel: {
        name: loc("achieve_extinct_kamel_name"),
        desc: loc("achieve_extinct_kamel_desc"),
        flair: loc("achieve_extinct_kamel_flair")
    },
    extinct_balorg: {
        name: loc("achieve_extinct_balorg_name"),
        desc: loc("achieve_extinct_balorg_desc"),
        flair: loc("achieve_extinct_balorg_flair")
    },
    extinct_imp: {
        name: loc("achieve_extinct_imp_name"),
        desc: loc("achieve_extinct_imp_desc"),
        flair: loc("achieve_extinct_imp_flair")
    },
    extinct_seraph: {
        name: loc("achieve_extinct_seraph_name"),
        desc: loc("achieve_extinct_seraph_desc"),
        flair: loc("achieve_extinct_seraph_flair")
    },
    extinct_unicorn: {
        name: loc("achieve_extinct_unicorn_name"),
        desc: loc("achieve_extinct_unicorn_desc"),
        flair: loc("achieve_extinct_unicorn_flair")
    },
    extinct_junker: {
        name: loc("achieve_extinct_junker_name"),
        desc: loc("achieve_extinct_junker_desc"),
        flair: loc("achieve_extinct_junker_flair")
    }
};

const feats = {
    take_no_advice: {
        name: loc("feat_take_no_advice_name"),
        desc: loc("feat_take_no_advice_desc"),
        flair: loc("feat_take_no_advice_flair")
    },
    ill_advised: {
        name: loc("feat_ill_advised_name"),
        desc: loc("feat_ill_advised_desc"),
        flair: loc("feat_ill_advised_flair")
    },
    organ_harvester: {
        name: loc("feat_organ_harvester_name"),
        desc: loc("feat_organ_harvester_desc"),
        flair: loc("feat_organ_harvester_flair")
    },
    the_misery: {
        name: loc("feat_the_misery_name"),
        desc: loc("feat_the_misery_desc"),
        flair: loc("feat_the_misery_flair")
    },
    blank_slate: {
        name: loc("feat_blank_slate_name"),
        desc: loc("feat_blank_slate_desc"),
        flair: loc("feat_blank_slate_flair")
    },
    supermassive: {
        name: loc("feat_supermassive_name"),
        desc: loc("feat_supermassive_desc"),
        flair: loc("feat_supermassive_flair")
    },
    rocky_road: {
        name: loc("feat_rocky_road_name"),
        desc: loc("feat_rocky_road_desc"),
        flair: loc("feat_rocky_road_flair")
    },
    nephilim: {
        name: loc("feat_nephilim_name"),
        desc: loc("feat_nephilim_desc"),
        flair: loc("feat_nephilim_flair")
    },
    halloween: {
        name: loc("feat_boo_name"),
        desc: loc("feat_boo_desc"),
        flair: loc("feat_boo_flair")
    },
    thanksgiving: {
        name: loc("feat_gobble_gobble_name"),
        desc: loc("feat_gobble_gobble_desc"),
        flair: loc("feat_gobble_gobble_flair")
    },
    heavy_genus_humanoid: {
        name: loc("feat_heavy_genus_humanoid_name"),
        desc: loc("feat_heavy_genus_humanoid_desc"),
        flair: loc("feat_heavy_genus_humanoid_flair")
    },
    heavy_genus_animal: {
        name: loc("feat_heavy_genus_animal_name"),
        desc: loc("feat_heavy_genus_animal_desc"),
        flair: loc("feat_heavy_genus_animal_flair")
    },
    heavy_genus_small: {
        name: loc("feat_heavy_genus_small_name"),
        desc: loc("feat_heavy_genus_small_desc"),
        flair: loc("feat_heavy_genus_small_flair")
    },
    heavy_genus_giant: {
        name: loc("feat_heavy_genus_giant_name"),
        desc: loc("feat_heavy_genus_giant_desc"),
        flair: loc("feat_heavy_genus_giant_flair")
    },
    heavy_genus_reptilian: {
        name: loc("feat_heavy_genus_reptilian_name"),
        desc: loc("feat_heavy_genus_reptilian_desc"),
        flair: loc("feat_heavy_genus_reptilian_flair")
    },
    heavy_genus_avian: {
        name: loc("feat_heavy_genus_avian_name"),
        desc: loc("feat_heavy_genus_avian_desc"),
        flair: loc("feat_heavy_genus_avian_flair")
    },
    heavy_genus_insectoid: {
        name: loc("feat_heavy_genus_insectoid_name"),
        desc: loc("feat_heavy_genus_insectoid_desc"),
        flair: loc("feat_heavy_genus_insectoid_flair")
    },
    heavy_genus_plant: {
        name: loc("feat_heavy_genus_plant_name"),
        desc: loc("feat_heavy_genus_plant_desc"),
        flair: loc("feat_heavy_genus_plant_flair")
    },
    heavy_genus_fungi: {
        name: loc("feat_heavy_genus_fungi_name"),
        desc: loc("feat_heavy_genus_fungi_desc"),
        flair: loc("feat_heavy_genus_fungi_flair")
    },
    heavy_genus_fey: {
        name: loc("feat_heavy_genus_fey_name"),
        desc: loc("feat_heavy_genus_fey_desc"),
        flair: loc("feat_heavy_genus_fey_flair")
    },
    heavy_genus_heat: {
        name: loc("feat_heavy_genus_heat_name"),
        desc: loc("feat_heavy_genus_heat_desc"),
        flair: loc("feat_heavy_genus_heat_flair")
    },
    heavy_genus_polar: {
        name: loc("feat_heavy_genus_polar_name"),
        desc: loc("feat_heavy_genus_polar_desc"),
        flair: loc("feat_heavy_genus_polar_flair")
    },
    heavy_genus_sand: {
        name: loc("feat_heavy_genus_sand_name"),
        desc: loc("feat_heavy_genus_sand_desc"),
        flair: loc("feat_heavy_genus_sand_flair")
    },
    heavy_genus_aquatic: {
        name: loc("feat_heavy_genus_aquatic_name"),
        desc: loc("feat_heavy_genus_aquatic_desc"),
        flair: loc("feat_heavy_genus_aquatic_flair")
    },
    heavy_genus_demonic: {
        name: loc("feat_heavy_genus_demonic_name"),
        desc: loc("feat_heavy_genus_demonic_desc"),
        flair: loc("feat_heavy_genus_demonic_flair")
    }
};

const perks = [
	'mass_extinction',
	'extinct_junker',
	'anarchist',
	'explorer',
	'creator',
	'whitehole',
	'blackhole',
	'dissipated',
	'heavyweight'
];

const upgrades = {
    genetic_memory: {
        id: 'genes-genetic_memory',
        title: loc('arpa_genepool_genetic_memory_title'),
        desc: loc('arpa_genepool_genetic_memory_desc'),
        reqs: {},
        grant: ['creep',1],
        cost: 25,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('genetic_memory')){
                return true;
            }
            return false;
        }
    },
    animus: {
        id: 'genes-animus',
        title: loc('arpa_genepool_animus_title'),
        desc: loc('arpa_genepool_animus_desc'),
        reqs: { creep: 1 },
        grant: ['creep',2],
        cost: 75,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('animus')){
                return true;
            }
            return false;
        }
    },
    divine_remembrance: {
        id: 'genes-divine_remembrance',
        title: loc('arpa_genepool_divine_remembrance_title'),
        desc: loc('arpa_genepool_divine_remembrance_desc'),
        reqs: { creep: 2 },
        grant: ['creep',3],
        cost: 225,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('divine_remembrance')){
                return true;
            }
            return false;
        }
    },
    divine_proportion: {
        id: 'genes-divine_proportion',
        title: loc('arpa_genepool_divine_proportion_title'),
        desc: loc('arpa_genepool_divine_proportion_desc'),
        reqs: { creep: 3 },
        grant: ['creep',4],
        cost: 618,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('divine_proportion')){
                return true;
            }
            return false;
        }
    },
    genetic_repository: {
        id: 'genes-genetic_repository',
        title: loc('arpa_genepool_genetic_repository_title'),
        desc: loc('arpa_genepool_genetic_repository_desc'),
        reqs: { creep: 4 },
        grant: ['creep',5],
        cost: 999,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('genetic_repository')){
                return true;
            }
            return false;
        }
    },
    spatial_reasoning: {
        id: 'genes-spatial_reasoning',
        title: loc('arpa_genepool_spatial_reasoning_title'),
        desc: loc('arpa_genepool_spatial_reasoning_desc'),
        reqs: {},
        grant: ['store',1],
        cost: 50,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('spatial_reasoning')){
                return true;
            }
            return false;
        }
    },
    spatial_superiority: {
        id: 'genes-spatial_superiority',
        title: loc('arpa_genepool_spatial_superiority_title'),
        desc: loc('arpa_genepool_spatial_superiority_desc'),
        reqs: { store: 1 },
        grant: ['store',2],
        cost: 125,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('spatial_superiority')){
                return true;
            }
            return false;
        }
    },
    spatial_supremacy: {
        id: 'genes-spatial_supremacy',
        title: loc('arpa_genepool_spatial_supremacy_title'),
        desc: loc('arpa_genepool_spatial_supremacy_desc'),
        reqs: { store: 2 },
        grant: ['store',3],
        cost: 325,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('spatial_supremacy')){
                return true;
            }
            return false;
        }
    },
    dimensional_warping: {
        id: 'genes-dimensional_warping',
        title: loc('arpa_genepool_dimensional_warping_title'),
        desc: loc('arpa_genepool_dimensional_warping_desc'),
        reqs: { store: 3 },
        grant: ['store',4],
        cost: 500,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('dimensional_warping')){
                return true;
            }
            return false;
        }
    },
    morphogenesis: {
        id: 'genes-morphogenesis',
        title: loc('arpa_genepool_morphogenesis_title'),
        desc: loc('arpa_genepool_morphogenesis_desc'),
        reqs: {},
        grant: ['evolve',1],
        cost: 10,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('morphogenesis')){
                return true;
            }
            return false;
        }
    },
    recombination: {
        id: 'genes-recombination',
        title: loc('arpa_genepool_recombination_title'),
        desc: loc('arpa_genepool_recombination_desc'),
        reqs: { evolve: 1 },
        grant: ['evolve',2],
        cost: 35,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('recombination')){
                return true;
            }
            return false;
        }
    },
    synthesis: {
        id: 'genes-synthesis',
        title: loc('arpa_genepool_synthesis_title'),
        desc: loc('arpa_genepool_synthesis_desc',[2,10]),
        reqs: { evolve: 1 },
        grant: ['synthesis',1],
        cost: 25,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('synthesis')){
                return true;
            }
            return false;
        }
    },
    karyokinesis: {
        id: 'genes-karyokinesis',
        title: loc('arpa_genepool_karyokinesis_title'),
        desc: loc('arpa_genepool_synthesis_desc',[3,25]),
        reqs: { synthesis: 1 },
        grant: ['synthesis',2],
        cost: 40,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('karyokinesis')){
                return true;
            }
            return false;
        }
    },
    cytokinesis: {
        id: 'genes-cytokinesis',
        title: loc('arpa_genepool_cytokinesis_title'),
        desc: loc('arpa_genepool_synthesis_desc',[4,50]),
        reqs: { synthesis: 2 },
        grant: ['synthesis',3],
        cost: 55,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('cytokinesis')){
                return true;
            }
            return false;
        }
    },
    mitosis: {
        id: 'genes-mitosis',
        title: loc('arpa_genepool_mitosis_title'),
        desc: loc('arpa_genepool_mitosis_desc',[3]),
        reqs: { synthesis: 3, evolve: 2 },
        grant: ['plasma',1],
        cost: 90,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('mitosis')){
                return true;
            }
            return false;
        }
    },
    metaphase: {
        id: 'genes-metaphase',
        title: loc('arpa_genepool_metaphase_title'),
        desc: loc('arpa_genepool_mitosis_desc',[5]),
        reqs: { plasma: 1 },
        grant: ['plasma',2],
        cost: 165,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('mitosis')){
                return true;
            }
            return false;
        }
    },
    mutation: {
        id: 'genes-mutation',
        title: loc('arpa_genepool_mutation_title'),
        desc: loc('arpa_genepool_mutation_desc'),
        reqs: { synthesis: 3, creep: 5 },
        grant: ['mutation',1],
        cost: 1250,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('mutation')){
                global.genes['mutation'] = 1;
                genetics();
                return true;
            }
            return false;
        }
    },
    transformation: {
        id: 'genes-transformation',
        title: loc('arpa_genepool_transformation_title'),
        desc: loc('arpa_genepool_transformation_desc'),
        reqs: { mutation: 1 },
        grant: ['mutation',2],
        cost: 1500,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('transformation')){
                global.genes['mutation'] = 2;
                genetics();
                return true;
            }
            return false;
        }
    },
    metamorphosis: {
        id: 'genes-metamorphosis',
        title: loc('arpa_genepool_metamorphosis_title'),
        desc: loc('arpa_genepool_metamorphosis_desc'),
        reqs: { mutation: 2 },
        grant: ['mutation',3],
        cost: 1750,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('metamorphosis')){
                global.genes['mutation'] = 3;
                genetics();
                return true;
            }
            return false;
        }
    },
    replication: {
        id: 'genes-replication',
        title: loc('arpa_genepool_replication_title'),
        desc: loc('arpa_genepool_replication_desc'),
        reqs: { evolve: 1 },
        grant: ['birth',1],
        cost: 65,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('replication')){
                return true;
            }
            return false;
        }
    },
    artificer: {
        id: 'genes-artificer',
        title: loc('arpa_genepool_artificer_title'),
        desc: loc('arpa_genepool_artificer_desc'),
        reqs: { evolve: 1 },
        grant: ['crafty',1],
        cost: 45,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('artificer')){
                return true;
            }
            return false;
        }
    },
    detail_oriented: {
        id: 'genes-detail_oriented',
        title: loc('arpa_genepool_detail_oriented_title'),
        desc: loc('arpa_genepool_crafting_desc',['50']),
        reqs: { crafty: 1 },
        grant: ['crafty',2],
        cost: 90,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('detail_oriented')){
                return true;
            }
            return false;
        }
    },
    rigorous: {
        id: 'genes-rigorous',
        title: loc('arpa_genepool_rigorous_title'),
        desc: loc('arpa_genepool_crafting_desc',['100']),
        reqs: { crafty: 2 },
        grant: ['crafty',3],
        cost: 135,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('rigorous')){
                return true;
            }
            return false;
        }
    },
    geographer: {
        id: 'genes-geographer',
        title: loc('arpa_genepool_geographer_title'),
        desc: loc('arpa_genepool_geographer_desc'),
        reqs: { store: 1 },
        grant: ['queue',1],
        cost: 75,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('geographer')){
                return true;
            }
            return false;
        }
    },
    architect: {
        id: 'genes-architect',
        title: loc('arpa_genepool_architect_title'),
        desc: loc('arpa_genepool_architect_desc'),
        reqs: { queue: 1 },
        grant: ['queue',2],
        cost: 160,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('architect')){
                return true;
            }
            return false;
        }
    },
    hardened_genes: {
        id: 'genes-hardened_genes',
        title: loc('arpa_genepool_hardened_genes_title'),
        desc: loc('arpa_genepool_hardened_genes_desc'),
        reqs: {},
        grant: ['challenge',1],
        cost: 5,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('hardened_genes')){
                return true;
            }
            return false;
        }
    },
    unlocked: {
        id: 'genes-unlocked',
        title: loc('arpa_genepool_unlocked_title'),
        desc: loc('arpa_genepool_unlocked_desc'),
        reqs: {challenge:1},
        grant: ['challenge',2],
        cost: 50,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('unlocked')){
                return true;
            }
            return false;
        }
    },
    ancients: {
        id: 'genes-ancients',
        title: loc('arpa_genepool_ancients_title'),
        desc: loc('arpa_genepool_ancients_desc'),
        reqs: { evolve: 2, old_gods: 1 },
        grant: ['ancients',1],
        cost: 120,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('ancients')){
                global.genes['ancients'] = 1;
                drawTech();
                return true;
            }
            return false;
        }
    },
    transcendence: {
        id: 'genes-transcendence',
        title: loc('arpa_genepool_transcendence_title'),
        desc: loc('arpa_genepool_transcendence_desc'),
        reqs: { ancients: 1, mutation: 3 },
        grant: ['transcendence',1],
        cost: 3000,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('transcendence')){
                global.genes['transcendence'] = 1;
                drawTech();
                return true;
            }
            return false;
        }
    },
    bleeding_effect: {
        id: 'genes-bleeding_effect',
        title: loc('arpa_genepool_bleeding_effect_title'),
        desc: loc('arpa_genepool_bleeding_effect_desc',[2.5]),
        reqs: { creep: 2 },
        grant: ['bleed',1],
        condition(){
            return global.race.universe === 'antimatter' ? true : false;
        },
        cost: 100,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('bleeding_effect')){
                return true;
            }
            return false;
        }
    },
    synchronicity: {
        id: 'genes-synchronicity',
        title: loc('arpa_genepool_synchronicity_title'),
        desc: loc('arpa_genepool_synchronicity_desc',[25]),
        reqs: { bleed: 1 },
        grant: ['bleed',2],
        cost: 500,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('synchronicity')){
                return true;
            }
            return false;
        }
    },
    astral_awareness: {
        id: 'genes-astral_awareness',
        title: loc('arpa_genepool_astral_awareness_title'),
        desc: loc('arpa_genepool_astral_awareness_desc'),
        reqs: { bleed: 2 },
        grant: ['bleed',3],
        cost: 1000,
        effect(){ return crispr_effect($(this)[0].cost); },
        action(){
            if (payPlasmids('astral_awareness')){
                return true;
            }
            return false;
        }
    }
}

var upgradeList = [];

$.each(achievements, function(index, achievement){
	if (!perks.includes(index)) {
		let html = '';
		html += '<div class="row"><div id="a-'+index+'" class="col-icon"></div><div>'+achievement.name+'</div></div>';
		$('#achievementList>div').append(html);
		$('#a-'+index).siblings().first().tooltip({ placement: 'right', 'title': achievement.desc+'<hr class="hr-tip"><span class="small">'+achievement.flair+'</span>', html: true });
	}
});
$.each(feats, function(index, feat){
	let html = '';
	html += '<div class="row"><div id="f-'+index+'" class="col-icon"></div><div>'+feat.name+'</div></div>';
	$('#featList>div').append(html);
	$('#f-'+index).siblings().first().tooltip({ placement: 'right', 'title': feat.desc+'<hr class="hr-tip"><span class="small">'+feat.flair+'</span>', html: true });
});
$.each(perks, function(index, perk){
	let achievement = achievements[perk];
	let html = '';
	html += '<div class="row"><div id="p-'+perk+'" class="col-icon"></div><div>'+achievement.name+'</div></div>';
	$('#perkList>div').append(html);
	$('#p-'+perk).siblings().first().tooltip({ placement: 'right', 'title': achievement.desc+'<hr class="hr-tip"><span class="small">'+achievement.flair+'</span>', html: true });
});
$.each(upgrades, function(index, upgrade){
	upgradeList.push(index);
	let html = '';
	html += '<div class="row"><div id="g-'+index+'" class="col-upgrade"></div><div>'+upgrade.title+' <span class="small">('+upgrade.grant[0]+' '+upgrade.grant[1]+')</span></div></div>';
	$('#crisprList>div').append(html);
	$('#g-'+index).siblings().first().tooltip({ placement: 'right', 'title': upgrade.title+'<hr class="hr-tip"><span class="small">'+upgrade.desc+'</span>', html: true });
});

var saveData = {
	achievements: {},
	feats: {},
	genes: {}
};

$('#load').on('click', function(){
	$('#achievementList>div>div .col-icon').html('');
	$('#achievementList>p').html('');
	$('#featList>div>div .col-icon').html('');
	$('#featList>p').html('');
	$('#perkList>div>div .col-icon').html('');
	$('#perkList>p').html('');
	$('#crisprList>div>div .col-upgrade').html('');
	$('#crisprList>p').html('');

	let importText = $('#saveTextarea').val();
	if (importText != '') {
		let data;
		let masteryLevel = achievementComplete = featComplete = perkComplete = upgradeComplete = 0;
		let masteryTotal = (Object.keys(achievements).length+1);
		try {
			data = JSON.parse(LZString.decompressFromBase64(importText));
			saveData.achievements = data.stats.achieve;
			saveData.feats = data.stats.feat;
			saveData.genes = data.genes;
		} catch(e) {
			alert('Invalid save data.')
			return false;
		}
		$.each(saveData.achievements, function(index, achievement){
			achievementComplete++;
			let starLevel = achievement.l;
			masteryLevel += achievement.l;
			if (index == 'joyless') masteryLevel += achievement.l;
			let star = ''
			if (starLevel > 4) star += `<svg class="star5" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			if (starLevel > 3) star += `<svg class="star4" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			if (starLevel > 2) star += `<svg class="star3" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			if (starLevel > 1) star += `<svg class="star2" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			star += `<svg class="star" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			let div = $('#a-'+index);
			div.html(star).tooltip({ placement: 'right', 'title': (achievement.l - 1)+' Challenges Completed' });
		});
		let achievementTotal = Object.keys(achievements).length;
		let aColor = (achievementComplete == Object.keys(achievements).length) ? 'yellow' : '';
		let mColor = (masteryLevel == Object.keys(achievements).length+1) ? 'yellow' : '';
		$('#achievementList>p').html('<span class="'+aColor+'">'+achievementComplete+'</span> of <span class="yellow">'+achievementTotal+'</span> Complete<br /><span class="'+mColor+'">'+(masteryLevel*.25)+'%</span> of <span class="yellow">'+(masteryTotal*1.25)+'%</span> Mastery');

		$.each(saveData.feats, function(index, feat){
			featComplete++;
			let star = '';
			if (feat > 4) star += `<svg class="star5" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			if (feat > 3) star += `<svg class="star4" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			if (feat > 2) star += `<svg class="star3" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			if (feat > 1) star += `<svg class="star2" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			star += `<svg class="star" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
			let div = $('#f-'+index);
			div.html(star).tooltip({ placement: 'right', 'title': (feat - 1)+' Challenges Completed' });
		});
		let fColor = (featComplete == Object.keys(feats).length) ? 'yellow' : '';
		$('#featList>p').html('<span class="'+fColor+'">'+featComplete+'</span> of <span class="yellow">'+Object.keys(feats).length+'</span> Complete');

		$.each(saveData.achievements, function(index, achievement){
			if (perks.includes(index)) {
				perkComplete++;
				let starLevel = achievement.l;
				let star = ''
				if (starLevel > 4) star += `<svg class="star5" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
				if (starLevel > 3) star += `<svg class="star4" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
				if (starLevel > 2) star += `<svg class="star3" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
				if (starLevel > 1) star += `<svg class="star2" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
				star += `<svg class="star" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 640 640" xml:space="preserve"><path d="M320.012 15.662l88.076 215.246L640 248.153 462.525 398.438l55.265 225.9-197.778-122.363-197.778 122.363 55.264-225.9L0 248.153l231.936-17.245z"/></svg>`;
				let div = $('#p-'+index);
				div.html(star).tooltip({ placement: 'right', 'title': (achievement.l - 1)+' Challenges Completed' });
			}
		});
		let pColor = (perkComplete == Object.keys(perks).length) ? 'yellow' : '';
		$('#perkList>p').html('<span class="'+pColor+'">'+perkComplete+'</span> of <span class="yellow">'+Object.keys(perks).length+'</span> Complete');

		$.each(upgrades, function(type, upgrade){
			$.each(saveData.genes, function(index, level){
				if (upgrade.grant[0] == index && upgrade.grant[1] <= level) {
					upgradeComplete++;
					let checkmark = `<svg class="checkmark" version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 1 20 20" xml:space="preserve"><path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"/></path></svg>`;
					let div = $('#g-'+type);
					div.html(checkmark).tooltip({ placement: 'right', 'title': 'Upgrade Purchased' });
				}
			});
		});
		let uColor = (upgradeComplete == Object.keys(upgrades).length) ? 'yellow' : '';
		$('#crisprList>p').html('<span class="'+uColor+'">'+upgradeComplete+'</span> of <span class="yellow">'+Object.keys(upgrades).length+'</span> Purchased');
	}
});

});