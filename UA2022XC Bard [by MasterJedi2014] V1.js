/*	-INFORMATION-
	Subject:	Class, Subclass
	Effect:		This script adds the Bard class & its subclass from the 2022 Unearthed Arcana "Expert Classes" article.
				This file has been made by MasterJedi2014, borrowing a lot of code from MPMB and those who have contributed to the sheet's existing material.
	Code by:	MasterJedi2014, using MorePurpleMoreBetter's code as reference
	Date:		2024-03-11 (sheet v13.1.0)
*/

var iFileName = "UA2022XC Bard [by MasterJedi2014] V1.js";
RequiredSheetVersion("13.1.0");

SourceList["MJ:HB"] = {
	name : "MasterJedi2014's Homebrew",
	abbreviation : "MJ:HB",
	date : "2024/03/11",
};

SourceList["UA22XC"] = {
	name : "Unearthed Arcana 2022: Expert Classes",
	abbreviation : "UA22XC",
	date : "2022/09/29",
};

/* 	This Bard is the version that appeared in the UA22XC article. Due to the removal of the Arcane, Divine, &
	Primal Spell Lists from playtesting, this Bard has been altered to adhere to the spellcasting rules of later
	articles.
	Some of the code references spells that appear in later UA articles. These spells will be added to the sheet
	by the scripts for those UA articles.
*/
 // Ripped directly from "all_WotC_pub+UA.js"" and then altered
// Add UA22XC Bard class
ClassList.bard_ua22xc = {
	name : "Bard (UA:XC)",
	regExpSearch : /(bard|minstrel|troubadour)/i,
	source : [["UA22XC", 3], ["MJ:HB", 0]],
	primaryAbility : "Charisma",
	prerequisite : "Charisma 13+",
	prereqeval : function(v) {
		return What('Cha') >= 13;
	},
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Dex", "Cha"],
	skills : ["\n\n" + toUni("Bard") + ": Choose any three skills of my choice.", "Choose any one skill of my choice."],
	toolProfs : {
		primary : [["Musical instrument", 3]],
		secondary : [["Musical instrument", 1]],
	},
	armor : [
		[true, false, false, false],
		[true, false, false, false],
	],
	weapons : [
		[true, false, [""]],
		[true, false, [""]],
	],
	equipment : "Cleric starting equipment:" +
		"\n \u2022 Leather Armor," +
		"\n \u2022 Dagger," +
		"\n \u2022 Entertainer's Pack," +
		"\n \u2022 Musical Instrument of my choice," +
		"\n \u2022 Shortsword," +
		"\n \u2022 and 18 gp;" +
		"\n\nAlternatively, choose 100 gp worth of starting equipment instead of the class' starting equipment.",
	subclasses : ["Bard College", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
	abilitySave : 6,
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : "list",
		prepared : true,
	},
	spellcastingList : {
		class : ["bard"],
	},
	features : {
		"bardic inspiration ua22xc" : { //Ripped directly from "ListClasses.js" and then heavily altered
			name : "Bardic Inspiration",
			source : [["UA22XC", 4], ["SRD", 12], ["P", 53], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				" \u2022 Boost a d20 Test. As a Reaction, when another creature within 60 ft that I can see/hear",
				"  fails a d20 Test, I can give that creature an Inspiration die. The creature adds the result of",
				"  that die to their d20 Test result, potentially turning a failure into a success.",
				" \u2022 Heal. Immediately after another creature within 60 ft that I can see/hear takes damage,",
				"  I can use my Reaction to roll my Inspiration die \u0026 restore the resulting number of HP to the creature.",
			]),
			additional : ["d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12", "d12", "d12"],
			limfeaname : "Bard Insp.",
			usages : "Prof. Bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : levels.map(function (n) {
				return n < 7 ? "long rest" : "short rest";
			}),
			action : [
				["reaction", " (d20 Boost)"],
				["reaction", " (Heal)"],
			],
		},
		"spellcasting ua22xc" : { //Ripped directly from the Cleric class in "UA2023PT6 Content [by MasterJedi2014] V4.js" and then altered
			name : "Spellcasting",
			source : [["UA22XC", 5], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				"I can cast prepared bard cantrips/spells, using Charisma as my spellcasting ability.",
				"I can use a musical instrument as a spellcasting focus for my bard spells.",
				"I can cast my prepared bard spells as rituals if they have the ritual tag.",
			]),
			additional : levels.map(function (n, idx) {
				return [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5][idx] + " cantrips known";
			}),
		},
		"expertise ua22xc" : function() { //Ripped directly from "ListClasses.js" and then altered
			var a = {
				name : "Expertise",
				source : [["UA22XC", 5], ["SRD", 13], ["P", 54], ["MJ:HB", 0]],
				minlevel : 2,
				description : desc("I gain expertise with two skills I am proficient with; two more at 9th level"),
				skillstxt : "Expertise with any two skill proficiencies, and two more at 9th level",
				additional : levels.map(function (n) {
					return n < 2 ? "" : "with " + (n < 9 ? 2 : 4) + " skills";
				}),
				extraname : "Bard Expertise",
				extrachoices : ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"],
				extraTimes : levels.map(function (n) { return n < 2 ? 0 : n < 9 ? 2 : 4; })
			};
			for (var i = 0; i < a.extrachoices.length; i++) {
				var attr = a.extrachoices[i].toLowerCase();
				a[attr] = {
					name : a.extrachoices[i] + " Expertise",
					description : "",
					source : a.source,
					skills : [[a.extrachoices[i], "only"]],
					prereqeval : function(v) {
						return v.skillProfsLC.indexOf(v.choice) === -1 ? false : v.skillExpertiseLC.indexOf(v.choice) === -1 ? true : "markButDisable";
					}
				};
			}
			return a;
		}(),
		"songs of restoration 1 ua22xc" : {
			name : "Songs of Restoration 1",
			source : [["UA22XC", 5], ["MJ:HB", 0]],
			minlevel : 2,
			description : desc([
				"I have learned how to use music, poetry, \u0026 dance to heal wounds and maladies.",
				"I know the spell Healing Word, \u0026 it doesn't count against the number of spells I can prepare.",
				"I'll learn additional spells at Bard Levels 4, 6, 8, \u0026 10.",
			]),
			spellChanges : {
				"healing word" : {
					firstCol : "markedbox",
					changes : "I know the spell Healing Word, \u0026 it doesn't count against the number of spells I can prepare.",
				},
				"healing word ua23pt8" : {
					firstCol : "markedbox",
					changes : "I know the spell Healing Word (UA23PT8), \u0026 it doesn't count against the number of spells I can prepare.",
				},
			},
		},
		"subclassfeature3" : { //Ripped directly from "ListClasses.js"
			name : "Bard College",
			source : [["UA22XC", 5], ["SRD", 12], ["P", 54]],
			minlevel : 3,
			description : desc('Choose a College that reflects your personality and put it in the "Class" field ')
		},
		"songs of restoration 2 ua22xc" : {
			name : "Songs of Restoration 2",
			source : [["UA22XC", 5], ["MJ:HB", 0]],
			minlevel : 4,
			description : desc([
				"I know the spell Lesser Restoration, \u0026 it doesn't count against the number of spells I can prepare.",
			]),
			spellChanges : {
				"lesser restoration" : {
					firstCol : "markedbox",
					changes : "I know the spell Lesser Restoration, \u0026 it doesn't count against the number of spells I can prepare.",
				},
			},
		},
		"jack of all trades ua22xc" : { //Ripped directly from "ListClasses.js"
			name : "Jack of All Trades",
			source : [["UA22XC", 5], ["SRD", 12], ["P", 54]],
			minlevel : 5,
			description : desc("I can add half my Proficiency Bonus to any ability check that doesn't already include it"),
			eval : function() { Checkbox('Jack of All Trades', true); },
			removeeval : function() { Checkbox('Jack of All Trades', false); }
		},
		"songs of restoration 3 ua22xc" : {
			name : "Songs of Restoration 3",
			source : [["UA22XC", 5], ["MJ:HB", 0]],
			minlevel : 6,
			description : desc([
				"I know the spell Mass Healing Word, \u0026 it doesn't count against the number of spells I can prepare.",
			]),
			spellChanges : {
				"mass healing word" : {
					firstCol : "markedbox",
					changes : "I know the spell Mass Healing Word, \u0026 it doesn't count against the number of spells I can prepare.",
				},
				"mass healing word ua23pt8" : {
					firstCol : "markedbox",
					changes : "I know the spell Mass Healing Word (UA23PT8), \u0026 it doesn't count against the number of spells I can prepare.",
				},
			},
		},
		"font of bardic inspiration ua22xc" : { //Ripped directly from "ListClasses.js"
			name : "Font of Bardic Inspiration",
			source : [["UA22XC", 5], ["SRD", 13], ["P", 54]],
			minlevel : 7,
			description : desc("I can now also recover my expended Bardic Inspiration uses after a short rest")
		},
		"songs of restoration 4 ua22xc" : {
			name : "Songs of Restoration 4",
			source : [["UA22XC", 5], ["MJ:HB", 0]],
			minlevel : 8,
			description : desc([
				"I know the spell Freedom of Movement, \u0026 it doesn't count against the number of spells I can prepare.",
			]),
			spellChanges : {
				"freedom of movement" : {
					firstCol : "markedbox",
					changes : "I know the spell Freedom of Movement, \u0026 it doesn't count against the number of spells I can prepare.",
				},
			},
		},
		"songs of restoration 5 ua22xc" : {
			name : "Songs of Restoration 5",
			source : [["UA22XC", 5], ["MJ:HB", 0]],
			minlevel : 10,
			description : desc([
				"I know the spell Greater Restoration, \u0026 it doesn't count against the number of spells I can prepare.",
			]),
			spellChanges : {
				"greater restoration" : {
					firstCol : "markedbox",
					changes : "I know the spell Greater Restoration, \u0026 it doesn't count against the number of spells I can prepare.",
				},
			},
		},
		"magical secrets ua22xc" : { //Ripped directly from "ListClasses.js" and then altered
			name : "Magical Secrets",
			source : [["UA22XC", 6], ["SRD", 13], ["P", 54], ["MJ:HB", 0]],
			minlevel : 11,
			description : desc("I can add two spells/cantrips from any class to my spells prepared/known; +2 more at level 15"),
			additional : levels.map(function (n) {
				return n < 11 ? "" : (n < 15 ? 2 : 4) + " spells/cantrips";
			}),
			spellcastingBonus : {
				name : "Magical Secret",
				"class" : "any",
				times : levels.map(function (n) {
					return n < 11 ? 0 : n < 15 ? 2 : 4;
				}),
			},
		},
		"superior bardic inspiration ua22xc" : { //Ripped directly from "ListClasses.js" and then altered
			name : "Superior Bardic Inspiration",
			source : [["UA22XC", 6], ["SRD", 13], ["P", 54], ["MJ:HB", 0]],
			minlevel : 18,
			description : desc("I regain two uses of Bardic Inspiration when I roll initiative"),
		},
		"epic boon ua22xc" : {
			name : "Epic Boon",
			source : [["UA22XC", 6], ["MJ:HB", 0]],
			minlevel : 20,
			description : desc([
				"I gain the Epic Boon of Luck Feat or another Epic Boon Feat of my choice.",
			]),
			eval : function() { AddFeat("Epic Boon of Luck (UA22XC)"); },
		},
	},
};

//// Add Bard optional choices; Ripped directly from all_WotC_pub+UA.js and then altered
AddFeatureChoice(ClassList.bard_ua22xc.features["spellcasting ua22xc"], true, "Access to Dunamancy Spells", {
	name : "Dunamancy Spells",
	extraname : "Optional Bard 1",
	source : [["W", 186]],
	description : desc([
		"All dunamancy spells are added to the bard spell list, each still pending DM's approval"
	]),
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "bard" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["sapping sting", "gift of alacrity", "magnify gravity", "fortune's favor", "immovable object", "wristpocket", "pulse wave", "gravity sinkhole", "temporal shunt", "gravity fissure", "tether essence", "dark star", "reality break", "ravenous void", "time ravage"]);
			},
			"This optional class feature expands the spell list of the bard class with all dunamancy spells (spell level in brackets): Sapping Sting (cantrip), Gift of Alacrity (1), Magnify Gravity (1), Fortune's Favor (2), Immovable Object (2), Wristpocket (2), Pulse Wave (3), Gravity Sinkhole (4), Temporal Shunt (5), Gravity Fissure (6), Tether Essence (7), Dark Star (8), Reality Break (8),Ravenous Void (9), and Time Ravage (9)."
		]
	}
}, "Optional 1st-level bard features");
AddFeatureChoice(ClassList.bard_ua22xc.features["spellcasting ua22xc"], true, "Additional Bard Spells", {
	name : "Additional Bard Spells",
	source : [["T", 27]],
	extraname : "Optional Bard 1",
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "bard" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["color spray", "command", "aid", "enlarge/reduce", "mirror image", "mass healing word", "slow", "phantasmal killer", "rary's telepathic bond", "heroes' feast", "prismatic spray", "antipathy/sympathy", "prismatic wall"]);
			},
			"This optional class feature expands the spell list of the bard class with the following spells (spell level in brackets): Color Spray (1), Command (1), Aid (2), Enlarge/Reduce (2), Mirror Image (2), Mass Healing Word (3), Slow (3), Phantasmal Killer (4), Rary's Telepathic Bond (5), Heroes' Feast (6), Prismatic Spray (7), Antipathy/Sympathy (8), and Prismatic Wall (9)."
		]
	}
}, "Optional 1st-level bard features");
AddFeatureChoice(ClassList.bard_ua22xc.features["songs of restoration 2 ua22xc"], true, "Bardic Versatility", {
	name : "Bardic Versatility",
	extraname : "Optional Bard 4",
	source : [["T", 28]],
	description : " [ASI = Ability Score Improvement]" + desc([
		"Whenever I gain an ASI from the bard class, I can change one cantrip or expertise choice",
		"I can select another cantrip from the bard spell list or another skill I'm proficient with"
	]),
	prereqeval : function (v) { return classes.known.bard_ua22xc.level >= 4 ? true : "skip"; }
}, "Optional 4th-level bard features");

//// Add "UA 2019: Class Feature Variants" Bard optional choices; Ripped directly from all_WotC_pub+UA.js and then altered
AddFeatureChoice(ClassList.bard_ua22xc.features["spellcasting ua22xc"], true, "Spell Versatility (ua)", {
	name : "Spell Versatility",
	extraname : "Optional Bard 1",
	source : [["UA:CFV", 3]],
	description : "\n   After a long rest, I can swap a bard cantrip or spell I know for another of the same level"
}, "Optional 1st-level bard features");
AddFeatureChoice(ClassList.bard_ua22xc.features["spellcasting ua22xc"], true, "Expanded Spell List (ua)", {
	name : "Expanded Bard Spell List",
	extraname : "Optional Bard 1",
	source : [["UA:CFV", 3]],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "bard" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["cause fear", "color spray", "command", "aid", "enlarge/reduce", "mind spike", "mirror image", "phantasmal force", "mass healing word", "slow", "tiny servant", "phantasmal killer", "contact other plane", "rary's telepathic bond", "heroes' feast", "mental prison", "scatter", "tenser's transformation", "power word pain", "prismatic spray", "antipathy/sympathy", "maze", "prismatic wall"]);
			},
			"This alternative class feature enhancement expands the spell list of the bard class with the following spells (spell level in brackets): Cause Fear (1), Color Spray (1), Command (1), Aid (2), Enlarge/Reduce (2), Mind Spike (2), Mirror Image (2), Phantasmal Force (2), Mass Healing Word (3), Slow (3), Tiny Servant (3), Phantasmal Killer (4), Contact Other Plane (5), Rary's Telepathic Bond (5), Heroes' Feast (6), Mental Prison (6), Scatter (6), Tenser's Transformation (6), Power Word Pain (7), Prismatic Spray (7), Antipathy/Sympathy (8), Maze (8), and Prismatic Wall (9)."
		]
	}
}, "Optional 1st-level bard features");

////// Add UA22XC College of Lore Bard subclass
AddSubClass("bard_ua22xc", "college of lore_ua22xc", {
	regExpSearch : /^(college|bard|minstrel|troubadour)(?=.*lore).*$/i,
	subname : "College of Lore",
	source : [["UA22XC", 7], ["SRD", 13], ["P", 54], ["MJ:HB", 0]],
	features : {
		"subclassfeature3" : { //Ripped directly from "ListClasses.js" and then heavily altered
			name : "Bonus Proficiencies",
			source : [["UA22XC", 7], ["SRD", 13], ["P", 54], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"I gain Proficiency with Arcana, History, \u0026 Nature. If I am already Proficient in one of those,",
				"  I gain Proficiency with another Skill of my choice.",
			]),
			skills : [
				"Arcana",
				"History",
				"Nature",
			],
			skillstxt : "Proficiency with Arcana, History, \u0026 Nature. Choose another if already Proficient in one.",
		},
		"subclassfeature3.1" : { //Ripped directly from "ListClasses.js" and then altered
			name : "Cutting Words",
			source : [["UA22XC", 7], ["SRD", 13], ["P", 54], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"As a reaction, when a foe within earshot & 60 ft rolls ability check, attack or damage,",
				"  I can subtract a Bardic Inspiration die from the result."
			]),
			action : ["reaction", ""]
		},
		"subclassfeature6" : {
			name : "Cunning Inspiration",
			source : [["UA22XC", 7], ["MJ:HB", 0]],
			minlevel : 6,
			description : desc([
				"My Bardic Inspiration die are rolled with Advantage.",
			]),
		},
		"subclassfeature10" : {
			name : "Improved Cutting Words",
			source : [["UA22XC", 7], ["MJ:HB", 0]],
			minlevel : 10,
			description : desc([
				"When I use my Cunning WOrds feature, I can deal Psychic Damage equal to the number rolled on",
				"  the Bardic Inspiration die + my Charisma modifier.",
			]),
		},
		"subclassfeature14" : { //Ripped directly from "ListClasses.js" and then altered
			name : "Peerless Skill",
			source : [["UA22XC", 7], ["SRD", 14], ["P", 55], ["MJ:HB", 0]],
			minlevel : 14,
			description : desc([
				"When making an ability check, I can expend a use of Bardic Inspiration to add the die.",
				"If the check still fails, the Bardic Inspiration isn't expended.",
			]),
		},
	},
});