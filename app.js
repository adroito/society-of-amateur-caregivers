
      /* ============ shared helpers ============ */
      function downloadText(filename, text) {
        var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      }
      function copyText(text, statusEl, doneMsg) {
        function ok() { statusEl.textContent = doneMsg; setTimeout(function(){ statusEl.textContent=""; }, 3500); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(ok, function () { fallback(); });
        } else { fallback(); }
        function fallback() {
          var ta = document.createElement("textarea");
          ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
          document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); ok(); } catch (e) { statusEl.textContent = "Copy was blocked — use Download instead."; }
          document.body.removeChild(ta);
        }
      }

      /* ============ Web3Forms — hidden forwarding (no address shown on page) ============ */
      function sendViaWeb3Forms(formEl, statusEl, submitBtn, sendingText, onSuccess) {
        var originalText = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = sendingText; }
        if (statusEl) { statusEl.style.color = "var(--ink-soft)"; statusEl.textContent = "Sending your request… please wait a moment."; }
        fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(formEl) })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data && data.success) {
              if (statusEl) statusEl.textContent = "";
              onSuccess();
            } else {
              throw new Error("send failed");
            }
          })
          .catch(function () {
            if (statusEl) {
              statusEl.style.color = "var(--danger-ink)";
              statusEl.textContent = "Your request could not be sent just now — please check your connection and try again. Nothing was sent, and your answers are still in the form above.";
            }
          })
          .finally(function () {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
          });
      }

      /* ============ SOP library data — written in our own words ============ */
      var SOP_LIBRARY = [
        {
          id: "changing-and-freshening",
          title: "Changing & Freshening a Person in Bed",
          problem: "For when a brief, pad, and shirt need changing and the person cannot leave the bed — the full bedside change, in order.",
          intro: "How to change a diaper, Chux pad, and shirt for a person who cannot leave the bed — calmly, cleanly, and without rushing. Work through it in order, checking off each step as you go.",
          sections: [
            { title: "Prep Box Checklist", items: [
              "Zinc oxide cream (preferred brand)",
              "Infant diaper (optional, for unexpected urination)",
              "Wipes (10+ pulled out before starting)",
              "Minimum 3 pairs of gloves",
              "1 Chux / pee pad",
              "1 adult diaper",
              "Waste bin with fresh liner"
            ]},
            { title: "Setup Checklist", items: [
              "Turn on lights",
              "Optional: calming music",
              "Put on first pair of gloves",
              "Place waste bin nearby",
              "Pull out at least 10 wipes",
              "Open clean Chux pad",
              "Open clean adult diaper",
              "Raise bed to comfortable working height — laid flat"
            ]},
            { title: "Positioning", items: [
              "Pull sheets back",
              "Place feet apart on pillow",
              "Keep heels slightly hanging off pillow/mattress to reduce pressure points",
              "Open soiled diaper tabs and roll down",
              "Clean lower abdomen, groin, and crotch area"
            ]},
            { title: "Turn to Side", items: [
              "Ask person to raise arm overhead toward headboard and grab bed rail if possible",
              "Place one hand behind shoulder",
              "Place one hand under upper thigh, just above knee",
              "Keep back straight and avoid neck strain",
              "Roll person gently onto side"
            ]},
            { title: "Remove Soiled Items", items: [
              "Remove soiled diaper and discard",
              "Wipe poo away from groin",
              "Roll dirty Chux pad toward buttocks",
              "Leave rolled pad in place temporarily"
            ]},
            { title: "Cleaning", items: [
              "Clean all folds and creases",
              "Continue until wipes come away clean",
              "If urination begins, use infant diaper temporarily and continue cleaning",
              "Cleanliness is more important than speed. The more times a person is comfortably resting in different positions, the better"
            ]},
            { title: "Glove Change", items: [
              "Remove soiled gloves",
              "Put on clean gloves before handling clean supplies"
            ]},
            { title: "Place Clean Chux", items: [
              "While person remains on side, place clean Chux against body",
              "Fan-fold half underneath body",
              "Leave remaining half folded for later"
            ]},
            { title: "Skin Protection", items: [
              "Allow side-lying for pressure relief if comfortable",
              "Apply generous zinc oxide to buttocks",
              "Apply to red areas, hot spots, bed sore areas, and rash-prone skin"
            ]},
            { title: "Place Clean Diaper", items: [
              "While still side-lying, position diaper through crotch area",
              "Tuck rear half beneath body",
              "Keep diaper tight against clean Chux pad"
            ]},
            { title: "Return to Back", items: [
              "Hold diaper against buttocks to avoid wiping off zinc oxide",
              "Roll person onto back on clean half of Chux pad"
            ]},
            { title: "Second Turn", items: [
              "Move to opposite side of bed",
              "Have person raise opposite arm if possible, grasp rail, and help roll to side",
              "Roll onto opposite side",
              "Remove dirty rolled Chux pad",
              "Unfold clean Chux pad flat",
              "Pull diaper through and adjust around crotch"
            ]},
            { title: "Finish Diaper", items: [
              "Tell person verbally that turning is complete",
              "Roll onto back",
              "Secure diaper tabs at waist",
              "Check comfort and fit"
            ]},
            { title: "Change Shirt", items: [
              "Assist to sitting position if able",
              "Change shirt if needed",
              "Check back for redness or hot spots",
              "Apply antifungal powder if part of routine care"
            ]},
            { title: "Reposition Up in Bed", items: [
              "From head of bed, assist person back toward pillow",
              "Use bed controls when needed",
              "Goal: prevent sliding downward in bed"
            ]},
            { title: "Final Positioning", items: [
              "Adjust head pillow",
              "Support feet and keep heels off direct pressure",
              "Replace sheets if needed",
              "Raise feet slightly",
              "Raise head of bed for comfort"
            ]},
            { title: "Cleanup", items: [
              "Remove trash liner",
              "Remove gloves into trash bag",
              "Tie drawstring",
              "Dispose in larger trash bin",
              "Wash hands"
            ]},
            { title: "Care Principles", principles: true, items: [
              "Take your time",
              "Keep person clean and dry",
              "Protect skin every change",
              "Communicate throughout process"
            ]}
          ]
        },
        {
          id: "bed-bathing",
          title: "Bed Bathing — A Full Wash in Bed",
          problem: "For a full, dignified wash when getting to a shower or tub is no longer possible.",
          intro: "A complete bath given in bed, in a set order — face first, privatest parts last — with the person kept warm and covered throughout. Use it on bath days, and do shorter freshen-ups in between.",
          sections: [
            { title: "Gather Supplies", items: [
              "Wash basin and comfortably warm water",
              "Mild soap and a spare basin or cup of clean water for rinsing",
              "Two washcloths and two towels, plus a spare set",
              "Clean gown or clothes for afterward",
              "Clean bedding, if a change is planned",
              "Barrier cream and lotion, if part of the person’s routine",
              "Gloves and a waste bin within reach"
            ]},
            { title: "Set Up the Room", items: [
              "Close the door or curtain — privacy first",
              "Warm the room; a person in bed chills quickly",
              "Explain what you are about to do, step by step, as you go",
              "Raise the bed to a comfortable working height if it adjusts",
              "Test the water on the inside of your wrist — warm, never hot",
              "Lay a towel under whichever part you are washing to keep the bed dry"
            ]},
            { title: "Wash in Order — Cleanest First", items: [
              "Face first, with water alone unless the person prefers soap",
              "Neck and behind the ears",
              "One arm, then the other — hand, arm, underarm",
              "Chest and stomach, keeping the person covered with a towel or blanket elsewhere",
              "Roll gently to one side and wash the back",
              "One leg, then the other, including feet and between the toes",
              "Last of all, the groin and buttocks — change the water and use the fresh cloth for this"
            ]},
            { title: "Rinse, Dry, and Tend the Skin", items: [
              "Rinse soap off so it does not dry and itch",
              "Pat dry rather than rubbing — especially in every fold and crease",
              "Apply lotion if it is part of the routine",
              "Apply barrier cream where skin stays in contact with a brief or pad",
              "Look as you go: note redness that does not fade, rashes, or broken skin to report to the care team"
            ]},
            { title: "Fresh Clothes and Bedding", items: [
              "Dress the person in the clean gown or clothes",
              "Change any damp or soiled sheets — roll the person gently to one side, work the sheet under, roll back, finish the other side",
              "Settle pillows: head supported, heels resting off the mattress on a pillow under the calves",
              "Ask what would make them more comfortable — and adjust"
            ]},
            { title: "Finish and Clean Up", items: [
              "Empty the basin away from the bed and rinse it",
              "Bag laundry and rubbish",
              "Remove gloves and wash your hands",
              "Write down or pass on anything you noticed — skin changes, soreness, low mood — for the care team"
            ]},
            { title: "Care Principles", principles: true, items: [
              "Keep the person covered except the part being washed",
              "Check the water warmth every time you refill",
              "Unhurried is thorough — a bath is also a skin inspection",
              "Talk throughout, and let the person do any part they still can"
            ]}
          ]
        },
        {
          id: "repositioning",
          title: "Repositioning & Pressure Injury Prevention",
          problem: "For preventing pressure sores (bed sores) in someone who cannot shift their own weight — the regular turn, done right.",
          intro: "Skin breaks down where body weight presses it against the bed for too long. The amateur’s job is simple and vital: change the person’s position on a steady rhythm, float the heels, and look at the skin at every turn.",
          sections: [
            { title: "Know the Rhythm", items: [
              "Turn or reposition at least every two hours unless the care team has set a different schedule — follow theirs",
              "Keep a simple written turning schedule at the bedside and tick it off",
              "Rotate positions: back, right side, left side, back",
              "If a full turn is not tolerated, small shifts of weight still help — ask the care team to show you",
              "Reposition in the chair as well as in bed, if the person sits up in one"
            ]},
            { title: "Gather and Prepare", items: [
              "Three or four pillows, plus a folded blanket or wedge if the care team provided one",
              "A draw sheet or flat sheet under the person’s torso, if one is in use",
              "Barrier cream within reach",
              "Explain the turn before you start, and agree a count or signal",
              "Make sure tubes, catheters, and bedding will not pull or trap during the turn"
            ]},
            { title: "Make the Turn", items: [
              "Lower the head of the bed as flat as the person tolerates",
              "Move the person across toward one side of the bed first, using the draw sheet — never drag skin across the sheet",
              "Bend the far knee and place a hand at the shoulder and hip",
              "Roll the person gently toward you in one smooth movement, keeping your own back straight and bending your knees",
              "Settle them at roughly a 30-degree side tilt, not flat on the hip bone"
            ]},
            { title: "Support the New Position", items: [
              "Pillow behind the back to hold the tilt comfortably",
              "Pillow between the knees and ankles so bone does not rest on bone",
              "Pillow under the calves so the heels float completely off the mattress",
              "Head pillow low enough that the neck is not pushed forward",
              "Check fingers, toes, and ears are not folded or trapped, and nothing hard is under the body"
            ]},
            { title: "Skin Check — Every Turn", items: [
              "Look at the tailbone, heels, hips, elbows, shoulder blades, and the back of the head",
              "Note any redness — and whether it fades within about half an hour of the turn",
              "Keep skin clean and dry; refresh barrier cream on pressure areas",
              "Smooth the sheet underneath — wrinkles and crumbs press into skin",
              "Change a damp brief or pad straight away; moisture weakens skin fast"
            ]},
            { title: "Between Turns", items: [
              "Encourage any movement the person can do — ankle pumps, small shifts, reaching",
              "Keep drinks and food coming as the care plan allows; good nourishment helps skin hold up — report poor intake",
              "Keep bedding loose over the feet so toes are not pressed down",
              "Note the turn and the skin check on the bedside schedule"
            ]},
            { title: "Call the Care Team If", items: [
              "You find new broken skin, a blister, or an open sore",
              "Redness spreads, darkens, or does not fade after repositioning",
              "An area feels hot, swollen, or painful",
              "The person can no longer tolerate being turned"
            ]},
            { title: "Care Principles", principles: true, items: [
              "Little and often beats rare and big — keep the rhythm",
              "Lift and roll, never drag",
              "Heels off the mattress, always",
              "Every turn is also a skin inspection — look, note, report"
            ]}
          ]
        },
        {
          id: "feeding",
          title: "Feeding a Bedridden Person",
          problem: "For helping someone eat and drink in bed — upright, unhurried, and stopped at the first sign of trouble.",
          intro: "This checklist covers the everyday mealtime for a person the care team has said may eat and drink by mouth. Follow the diet and textures in their care plan exactly. It is not a guide for swallowing problems — if swallowing is difficult, that is the care team’s territory, in person.",
          sections: [
            { title: "Before You Start", items: [
              "Check the care plan: is eating and drinking by mouth approved, and are there set textures or thickened fluids? Follow it exactly",
              "Never feed a person who is sleepy, drowsy, or not fully awake — wait, and tell the care team",
              "Wash your hands",
              "Gather the tray, a clothing protector or napkin, utensils, a cup, and a straw only if the care plan allows one",
              "Offer the toilet, bedpan, or urinal first if needed, and do oral care or have water ready as the plan directs"
            ]},
            { title: "Position First — Always", items: [
              "Sit the person up as upright as possible — ideally near sitting position, at least well raised — unless the care team has said otherwise",
              "Support the head so the chin is level, not tilted back",
              "Make sure they are comfortable and stable before the first bite",
              "Sit yourself at their eye level, facing them"
            ]},
            { title: "During the Meal", items: [
              "Small bites and small sips, one at a time",
              "Wait until the mouth is empty and the swallow is finished before offering more",
              "Alternate food and drink as the care plan suggests",
              "Go at their pace — a meal may take a long while, and that is fine",
              "Talk with them; a meal is company as much as food",
              "Respect appetite: when they turn away, shake their head, or say they are done, the meal is done — never force food or drink"
            ]},
            { title: "Stop at Once If You See", items: [
              "Coughing or choking during or after a bite or sip",
              "A wet, gurgly-sounding voice after swallowing",
              "Food collecting in the cheeks, or falling from the mouth",
              "Drooling, repeated throat-clearing, or watery eyes while eating",
              "Any difficulty breathing — stop, keep them upright, and call the care team (or emergency services if they cannot breathe)"
            ]},
            { title: "After the Meal", items: [
              "Check the mouth is empty",
              "Do gentle oral care to clear food from teeth, gums, and cheeks",
              "Keep the person sitting upright for at least 30 minutes after eating",
              "Note for the care team how much was eaten and drunk, and anything that went wrong"
            ]},
            { title: "Care Principles", principles: true, items: [
              "Upright first, food second — every time",
              "Small, slow, and watched beats fast and finished",
              "Their appetite decides, not the plate",
              "Coughing is a stop sign, not a nuisance — act on it"
            ]}
          ]
        },
        {
          id: "oral-care",
          title: "Oral Care for a Person in Bed",
          problem: "For keeping the mouth clean and comfortable — morning, evening, and after meals — for someone who cannot get to a sink.",
          intro: "A clean mouth means comfort, better appetite, and fewer infections. This is the twice-a-day routine, plus denture care, written for a person resting in bed.",
          sections: [
            { title: "Gather Supplies", items: [
              "Soft toothbrush and a pea-sized amount of fluoride toothpaste",
              "Cup of water and a small basin or kidney dish to spit into",
              "Towel to lay across the chest",
              "Lip balm",
              "Mouth swabs, if the care team has recommended them",
              "Gloves, and a small torch or good light if the room is dim"
            ]},
            { title: "Position and Prepare", items: [
              "Wash your hands and put on gloves",
              "Explain what you are doing, even if the person cannot answer",
              "Raise the head of the bed well up if the person tolerates it",
              "Lay the towel across the chest and set the basin within easy reach",
              "Check you can see into the mouth clearly before you begin"
            ]},
            { title: "Brush Teeth and Gums", items: [
              "Brush gently in small circles — every surface of every tooth",
              "Take about two unhurried minutes",
              "Brush the tongue gently, front to back",
              "Offer small sips of water to rinse, and let the person spit into the basin",
              "If the person cannot spit, keep them turned slightly to one side so fluid drains out, use as little water as possible, and follow the method the care team showed you"
            ]},
            { title: "Denture Care, If Worn", items: [
              "Remove dentures gently and hold them over a towel or a basin of water so a drop does not break them",
              "Brush them with a denture brush or soft brush and rinse well",
              "Clean the gums and mouth while the dentures are out",
              "Store overnight exactly as the person’s routine or care plan directs",
              "Check dentures still fit — a sore mouth or loose fit goes on the report list"
            ]},
            { title: "Moisture, Lips, and a Good Look", items: [
              "Offer water to drink if the care plan allows it",
              "Apply lip balm to dry or cracked lips",
              "Look for sores, bleeding, white patches, swelling, or a coated tongue",
              "Note anything new, and report it to the care team — mouth problems are often easy to fix early"
            ]},
            { title: "How Often", items: [
              "Full clean morning and evening, every day",
              "A gentle clear-out after meals when you can",
              "For a person in hospice, moisten the mouth and refresh lip balm through the day for comfort, even when they no longer eat"
            ]},
            { title: "Care Principles", principles: true, items: [
              "Gentle wins — sore gums bleed easily",
              "A clean mouth is comfort care, not just hygiene",
              "Look while you clean, and report what you see",
              "Keep fluids draining out, never pooling, if the person cannot spit"
            ]}
          ]
        },
        {
          id: "bed-to-chair-transfer",
          title: "Bed-to-Chair Transfer",
          problem: "For moving a person from bed to chair and back — safely, slowly, and never by guesswork.",
          intro: "Only transfer a person if their care plan says they may, and use the equipment the care team has provided and shown you. If the person cannot bear weight, or you would be lifting alone beyond your strength, that transfer is a two-person or equipment job — wait for help.",
          sections: [
            { title: "Before You Move Anything", items: [
              "Check the care plan: may this person transfer, and what help or equipment is specified?",
              "Get a second person if the plan calls for one — do not improvise solo",
              "Place the chair beside the bed at a slight angle, close enough to reach in a short pivot",
              "Lock the brakes on the chair and on the bed",
              "Clear the path — no rugs, cords, or clutter between bed and chair",
              "Put firm, non-slip footwear on the person’s feet"
            ]},
            { title: "Prepare the Person", items: [
              "Explain each stage before it happens, and agree a count: “on three, we stand”",
              "Ask about pain or dizziness before you start",
              "Raise the head of the bed slowly and let the person sit up",
              "Help the legs over the edge of the bed so the feet rest flat on the floor",
              "Sit there together for a full minute — this pause prevents most dizziness",
              "If they feel dizzy or faint, lie them back down, wait, and tell the care team"
            ]},
            { title: "Stand Together", items: [
              "Fit the gait belt if the care team provided one and showed you how",
              "Stand close in front, your knees braced gently against theirs if you were shown that hold",
              "The person pushes up with arms and legs as much as they are able",
              "Rise together on the count, lifting with your legs — never with a bent back or a twist",
              "Pause standing still for a few breaths before moving; check they feel steady"
            ]},
            { title: "Turn and Sit", items: [
              "Take tiny shuffling steps, or one slow pivot, until the chair is behind their legs",
              "Stop when the backs of their legs touch the chair edge",
              "Have them reach back for the chair arms",
              "Lower down together, slowly, until they are seated well back in the chair",
              "If a person ever starts to fall, do not try to catch their full weight: ease them to the floor, protect the head, make them comfortable, and call for help"
            ]},
            { title: "Settle and Check", items: [
              "Feet supported flat — on the floor or on footrests",
              "Cushion or pillow behind the back if the care plan uses one",
              "Place water, phone, and the call bell or a way to summon help within reach",
              "Ask about comfort and check skin pressure points before you leave",
              "Stay nearby if the plan says the person is not to be left alone in a chair",
              "Note how the transfer went — strength, dizziness, pain — for the care team"
            ]},
            { title: "Care Principles", principles: true, items: [
              "Plan first, move second — brakes, chair, path, footwear",
              "The pause sitting, and the pause standing, are not wasted time",
              "Your back matters too: legs lift, backs do not",
              "No transfer is urgent enough to attempt beyond your ability — wait for help"
            ]}
          ]
        },
        {
          id: "incontinence-care",
          title: "Incontinence Care — Clean, Dry, and Dignified",
          problem: "For the everyday rhythm of checks, changes, and skin protection that keeps a person comfortable when continence is lost.",
          intro: "Incontinence is a condition, never a failing. This checklist is the routine around the change itself: checking on a schedule, changing promptly, protecting skin every time, and handling all of it matter-of-factly. For the full bed-change steps, use the Changing & Freshening SOP alongside this one.",
          sections: [
            { title: "Keep Supplies Stocked at the Bedside", items: [
              "Briefs in the right size, and absorbent pads or Chux",
              "Wipes and gentle cleanser",
              "Barrier cream",
              "Gloves and a lidded waste bin with fresh liners",
              "Spare clothes and spare bedding, ready before you need them at 3 a.m."
            ]},
            { title: "Check on a Schedule, Not on a Smell", items: [
              "Check every two to three hours, and at every repositioning",
              "Change promptly when wet or soiled — do not wait for the person to mention it; many will not",
              "Agree an overnight pattern with the care team so sleep for both of you is protected where possible",
              "Offer the toilet, commode, or urinal at regular times if that is part of the person’s plan — a routine helps some people stay partly continent"
            ]},
            { title: "At Every Change", items: [
              "Privacy first: door closed, person covered except where you are working",
              "Gloves on; explain what you are doing as you go",
              "Cleanse the whole area thoroughly, front to back, including every fold",
              "Pat fully dry — trapped moisture is what breaks skin down",
              "Apply barrier cream every single change, not just when skin looks sore",
              "Fit the fresh brief snugly but not tight, and check it is not twisted or bunched"
            ]},
            { title: "Protect Skin and Bedding", items: [
              "Keep an absorbent pad under the person to protect the sheet",
              "Change damp bedding straight away — lying in wet bedding undoes good skin care",
              "Avoid rough or heavily perfumed products on fragile skin",
              "Air the skin for a few minutes during a change when you can"
            ]},
            { title: "Fluids, Routine, and Tone of Voice", items: [
              "Keep drinks coming as the care plan allows — do not cut fluids to reduce accidents unless the care team directs it; that way lies infection and confusion",
              "Keep your manner completely matter-of-fact — no sighing, no commentary, no shame",
              "Protect their privacy in conversation too: care details stay between you, the person, and the care team"
            ]},
            { title: "Report to the Care Team If You Notice", items: [
              "Urine that is very dark, strong-smelling, cloudy, or bloody",
              "Much less urine than usual, or none over many hours",
              "Pain or distress when passing urine",
              "New rash, redness that spreads, or broken skin",
              "A sudden change in the usual pattern"
            ]},
            { title: "Care Principles", principles: true, items: [
              "Prompt beats perfect — a quick change now prevents sore skin later",
              "Barrier cream every change, no exceptions",
              "Dry is the goal: skin, brief, and bedding",
              "Dignity in every word — this is medical, not personal"
            ]}
          ]
        },
        {
          id: "fall-prevention",
          title: "Fall Prevention at Home",
          problem: "For walking the house with fresh eyes and removing the things people actually trip, slip, and fall on.",
          intro: "Most falls at home come from ordinary things: a dark hallway, a loose rug, a rushed trip to the bathroom at night. Work this checklist room by room, fix what you can today, and note the rest for the care team or family.",
          sections: [
            { title: "Light the Way", items: [
              "Night-lights along the route from bed to bathroom",
              "A lamp or torch within arm’s reach of the bed",
              "Light switches that can be reached before entering a dark room",
              "Check bulbs actually work — replace dim or dead ones"
            ]},
            { title: "Clear the Paths", items: [
              "Remove throw rugs, or at minimum tape them flat — loose rugs are the single most common trip hazard",
              "Move cords out of walkways or tape them down along walls",
              "Clear clutter, shoes, and pet toys from the floors people walk",
              "Arrange furniture so there is a steady, wide path, with something to hold along the way",
              "Bring everyday items down to easy-reach shelves — no climbing, no stretching on tiptoe"
            ]},
            { title: "Bathroom Safety", items: [
              "Grab bars by the toilet and in the shower or tub, if installed — towel rails and taps are not grab bars and can pull away",
              "Non-slip mat inside the tub or shower and a mat with a rubber back outside it",
              "Shower chair or bath seat in place if the care team provided one",
              "Consider a bedside commode or urinal at night if the care team agrees — most falls happen on the night-time bathroom trip"
            ]},
            { title: "Bed, Chair, and Mobility Aids", items: [
              "Bed at a height where the person’s feet rest flat on the floor when sitting on the edge",
              "A firm chair with arms — deep, soft chairs are hard to get out of safely",
              "Walker, cane, or other aid kept in one place, within reach, and used every time — not just on bad days",
              "Wheelchair brakes checked and locked before any transfer"
            ]},
            { title: "Body and Habits", items: [
              "Sit first, then stand, then walk — with a pause at each stage",
              "Firm shoes or non-slip socks; never loose slippers or bare feet on smooth floors",
              "Glasses on and hearing aids in before moving about",
              "Stand up slowly after meals and after lying down",
              "Tell the care team about any dizziness, unsteadiness, or new sleepiness — never adjust medication yourself, but always report"
            ]},
            { title: "The Night Routine", items: [
              "Water, phone, and a way to call for help within reach of the bed",
              "The route to the bathroom lit and clear before bedtime",
              "Agree who checks in, and when, if the person is alone overnight",
              "Keep a torch by the bed for power cuts"
            ]},
            { title: "After Any Fall", items: [
              "Do not rush to lift the person up",
              "If there is pain, a suspected injury, or a hit to the head, keep them still and comfortable and call the care team or emergency services",
              "Help them up slowly only if they are unhurt and able to bear weight with you",
              "Report every fall to the care team, even one with no injury, and note the time and what likely caused it — patterns prevent the next one"
            ]},
            { title: "Care Principles", principles: true, items: [
              "Fix the house, not just the person",
              "Slow stages: sit, stand, walk",
              "The night-time bathroom trip is the danger zone — plan for it",
              "Every fall gets reported, however small"
            ]}
          ]
        },
        {
          id: "hospice-comfort-care",
          title: "Hospice Comfort Care — Easing the Everyday",
          problem: "For the daily work of comfort when cure is no longer the goal: room, body, company, and calm.",
          intro: "In hospice, comfort is the whole job. This checklist is the amateur’s share of it — the room, the small physical kindnesses, presence, and knowing what to report. Medicines and care decisions belong to the hospice team; your work is everything around them.",
          sections: [
            { title: "Set the Room", items: [
              "Temperature comfortable for the person in the bed — they feel cold and heat differently than you do",
              "Soft, natural light by day; low light in the evening",
              "Fresh air for a few minutes if they enjoy it",
              "Favorite music, low — or quiet, if quiet is preferred",
              "Keep the room calm: one or two visitors at a time, matched to the person’s energy",
              "Water, tissues, lip balm, and the call bell or phone within their reach"
            ]},
            { title: "The Comfort Round — Small Things, Often", items: [
              "Change position or refresh pillows if they have been still a while",
              "Moisten the mouth and apply lip balm",
              "Smooth the bedding and check it is dry",
              "Lotion on dry hands, feet, and back, with a gentle rub if welcome",
              "Ask plainly: “What would make you more comfortable right now?” — then do that one thing"
            ]},
            { title: "Presence and Company", items: [
              "Sit at eye level, not standing over the bed",
              "Hold a hand if it is welcome; a hand nearby if it is not",
              "Read aloud — a newspaper, a letter, a favorite book — in short stretches",
              "Talk about ordinary life and good memories; laughter is allowed here",
              "Let silence be comfortable — being there is itself the care",
              "Let the person set the length of a visit, including ending it"
            ]},
            { title: "Food and Drink, Gently", items: [
              "Offer small amounts of favorite things, at the person’s wish",
              "Never press food or drink on someone who turns away or stops swallowing it comfortably",
              "A few sips, ice chips, or a moistened swab may be all that is wanted — follow the hospice team’s guidance",
              "Keep up mouth care for comfort even when eating has stopped"
            ]},
            { title: "Restlessness or Distress", items: [
              "Stay calm and speak slowly and softly",
              "Check the simple causes first: position, a full bladder, too warm or too cold, dry mouth",
              "Lower noise and light; one familiar voice at a time",
              "If restlessness or pain continues, call the hospice team — comfort medicines and their timing are theirs to direct, and they would rather be called early"
            ]},
            { title: "Work With the Hospice Team", items: [
              "Keep a simple bedside notebook: sleep, appetite, pain signs, mood, anything changing",
              "Report changes in breathing, alertness, pain, eating, drinking, or skin",
              "Keep the hospice team’s phone number at the bedside and use it — day or night, that is what it is for",
              "Ask every question you have; there are no small ones in hospice care"
            ]},
            { title: "Care Principles", principles: true, items: [
              "Comfort is the goal now — measure everything against it",
              "Presence over tasks: company is care",
              "Offer, never force — food, drink, talk, or visitors",
              "The hospice team is a phone call away, around the clock — use them"
            ]}
          ]
        },
        {
          id: "care-for-the-dying",
          title: "Care for the Dying Person — The Last Days and Hours",
          problem: "For knowing what families often see near the end, what comfort you can still give, and what to do when death comes.",
          intro: "This is general information about what many families notice in the last days of life, so that change is less frightening when it comes. Every person’s dying is their own — the hospice team knows your person and will guide you through their particular course. Nothing here replaces them.",
          sections: [
            { title: "What Families Often Notice", items: [
              "Sleeping much more, and waking less",
              "Less interest in food and drink, then none at all — this is the body’s natural slowing, not a problem to fix",
              "Hands and feet cooler than the rest of the body",
              "Skin on the legs, feet, or back taking on a blotchy or mottled look",
              "Breathing that becomes irregular, with pauses, or sounds moist and rattly",
              "Less response to voices and touch, and long stretches that look like deep sleep",
              "If any change frightens or puzzles you, call the hospice team and let them explain what it means for your person"
            ]},
            { title: "Keep Them Comfortable", items: [
              "Reposition gently, as tolerated, and keep pillows supporting arms and legs",
              "Moisten the mouth often and keep lip balm on — comfort mouth care continues to the end",
              "Keep bedding clean and dry; freshen in small, gentle stages rather than one big change",
              "Use light coverings — heavy blankets can feel like a weight",
              "Keep a calm room: soft light, low noise, familiar things nearby"
            ]},
            { title: "Be Present", items: [
              "Hearing is widely believed to linger — keep talking in a normal, gentle voice",
              "Say the things that need saying: love, thanks, forgiveness, goodbye",
              "Read, pray, sing, or play their favorite music if that fits who they are",
              "Hold a hand; simple touch often says what words cannot",
              "It is also all right to step out, rest, and eat — dying can take time, and you are allowed to take turns"
            ]},
            { title: "Gather Who Should Be There", items: [
              "Let family and close friends know the time may be near, so no one who wanted to come is too late",
              "Follow the person’s own wishes about visitors where they are known",
              "Children can be included as the family judges right, with honest, simple explanations",
              "Give people the chance to say goodbye privately if they wish"
            ]},
            { title: "When Death Comes", items: [
              "There is no emergency and no rush — sit with them a while if you wish",
              "When you are ready, call the hospice team on the number they gave you; the nurse will guide every next step",
              "Do not call 911 unless the care plan the hospice team left tells you to",
              "The hospice nurse will confirm the death and advise when to contact the funeral home named in the plan",
              "Take your time with goodbyes before anything is moved"
            ]},
            { title: "Afterward", items: [
              "Let others help — with calls, food, and the house",
              "Expect grief to come in waves and in its own order; there is no correct way",
              "Use the hospice bereavement support offered to families — it exists for exactly this season",
              "Be gentle with yourself: you showed up, and that was the work"
            ]},
            { title: "Care Principles", principles: true, items: [
              "You cannot do this wrong by being there with love",
              "Comfort, presence, and a calm room — that is the whole task now",
              "The hospice team is a phone call away, at any hour",
              "Nothing needs to happen fast — not the calls, not the goodbyes"
            ]}
          ]
        }
      ];

      /* ============ SOP library + viewer ============ */
      var grid = document.getElementById("sop-grid");
      var libGrid = document.getElementById("library-grid");
      var sopSelect = document.getElementById("sop-select");
      var currentSOP = 0;

      function sopSteps(sop) {
        var n = 0;
        sop.sections.forEach(function (s) { n += s.items.length; });
        return n;
      }

      SOP_LIBRARY.forEach(function (sop, idx) {
        var card = document.createElement("article");
        card.className = "lib-card" + (idx === 0 ? " active" : "");
        card.id = "lib-card-" + idx;
        var h = document.createElement("h3");
        h.textContent = sop.title;
        card.appendChild(h);
        var p = document.createElement("p");
        p.textContent = sop.problem;
        card.appendChild(p);
        var meta = document.createElement("div");
        meta.className = "meta";
        meta.textContent = sop.sections.length + " checklists · " + sopSteps(sop) + " steps";
        card.appendChild(meta);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "open-btn";
        btn.textContent = idx === 0 ? "Open checklist — in the viewer below" : "Open checklist";
        btn.addEventListener("click", function () {
          selectSOP(idx);
          document.getElementById("sop-viewer").scrollIntoView({ behavior: "smooth", block: "start" });
        });
        card.appendChild(btn);
        libGrid.appendChild(card);

        var opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = sop.title;
        sopSelect.appendChild(opt);
      });

      sopSelect.addEventListener("change", function () {
        selectSOP(parseInt(sopSelect.value, 10));
      });

      document.getElementById("hero-flagship").addEventListener("click", function () {
        selectSOP(0);
      });

      function selectSOP(idx) {
        currentSOP = idx;
        var sop = SOP_LIBRARY[idx];
        sopSelect.value = idx;
        document.getElementById("viewer-title").textContent = sop.title;
        document.getElementById("viewer-intro").textContent = sop.intro;
        SOP_LIBRARY.forEach(function (s2, i2) {
          var c = document.getElementById("lib-card-" + i2);
          if (c) {
            c.classList.toggle("active", i2 === idx);
            var b = c.querySelector(".open-btn");
            if (b) b.textContent = i2 === idx ? "Open checklist — in the viewer below" : "Open checklist";
          }
        });
        grid.innerHTML = "";
        sop.sections.forEach(function (section, si) {
          var card = document.createElement("article");
          card.className = "sop-step" + (section.principles ? " principles wide" : "");
          var h = document.createElement("h3");
          var num = document.createElement("span");
          num.className = "num";
          num.textContent = si + 1;
          h.appendChild(num);
          h.appendChild(document.createTextNode(section.title));
          card.appendChild(h);
          var dc = document.createElement("div");
          dc.className = "done-count";
          dc.id = "dc-" + si;
          dc.textContent = "0 of " + section.items.length + " done";
          card.appendChild(dc);
          var ul = document.createElement("ul");
          section.items.forEach(function (item) {
            var li = document.createElement("li");
            var label = document.createElement("label");
            var cb = document.createElement("input");
            cb.type = "checkbox";
            cb.setAttribute("data-section", si);
            cb.setAttribute("aria-label", section.title + ": " + item);
            var span = document.createElement("span");
            span.textContent = item;
            label.appendChild(cb);
            label.appendChild(span);
            li.appendChild(label);
            ul.appendChild(li);
            cb.addEventListener("change", function () {
              li.classList.toggle("checked", cb.checked);
              updateProgress();
            });
          });
          card.appendChild(ul);
          grid.appendChild(card);
        });
        updateProgress();
      }

      function updateProgress() {
        var sop = SOP_LIBRARY[currentSOP];
        var total = sopSteps(sop);
        var boxes = grid.querySelectorAll('input[type="checkbox"]');
        var done = 0;
        var perSection = {};
        boxes.forEach(function (b) {
          var s = b.getAttribute("data-section");
          if (!perSection[s]) perSection[s] = 0;
          if (b.checked) { done++; perSection[s]++; }
        });
        sop.sections.forEach(function (section, si) {
          var el = document.getElementById("dc-" + si);
          if (el) el.textContent = (perSection[si] || 0) + " of " + section.items.length + " done";
        });
        document.getElementById("progress-label").textContent =
          done + " of " + total + " steps complete" + (done === total && total > 0 ? " — finished. Well done." : "");
        document.getElementById("progress-fill").style.width =
          (total ? (done / total) * 100 : 0) + "%";
      }

      document.getElementById("reset-sop").addEventListener("click", function () {
        grid.querySelectorAll('input[type="checkbox"]').forEach(function (b) {
          b.checked = false;
          b.closest("li").classList.remove("checked");
        });
        updateProgress();
      });

      function sopText() {
        var sop = SOP_LIBRARY[currentSOP];
        var lines = [];
        lines.push("CAREGIVER SOP — " + sop.title);
        lines.push("Society of Amateur Caregivers");
        lines.push("");
        lines.push("General caregiving information, not medical advice. Amateur caregivers work");
        lines.push("alongside the medical and hospice team; their guidance for your person comes first.");
        lines.push("");
        sop.sections.forEach(function (section, si) {
          lines.push((si + 1) + ". " + section.title.toUpperCase());
          section.items.forEach(function (item) { lines.push("  [ ] " + item); });
          lines.push("");
        });
        return lines.join("\n");
      }

      document.getElementById("download-sop").addEventListener("click", function () {
        downloadText(SOP_LIBRARY[currentSOP].id + "-sop.txt", sopText());
      });
      document.getElementById("copy-sop").addEventListener("click", function () {
        copyText(sopText(), document.getElementById("sop-copied"), "Checklist copied — paste it anywhere to share it.");
      });

      selectSOP(0);

      /* ============ printed SOP binder ============ */
      function buildBinderPrint() {
        var wrap = document.getElementById("binder-print");
        wrap.innerHTML = "";
        var cover = document.createElement("div");
        cover.className = "binder-doc binder-cover";
        var org = document.createElement("div");
        org.className = "bc-org";
        org.textContent = "Society of Amateur Caregivers";
        cover.appendChild(org);
        var h = document.createElement("h2");
        h.textContent = "The SOP Binder";
        cover.appendChild(h);
        var sub = document.createElement("p");
        sub.textContent = "Ten step-by-step caregiving procedures, printed as one binder-ready set. Work through each checklist in order and tick the box beside every step as you complete it.";
        cover.appendChild(sub);
        var contentsHead = document.createElement("h3");
        contentsHead.textContent = "Contents";
        cover.appendChild(contentsHead);
        var ol = document.createElement("ol");
        SOP_LIBRARY.forEach(function (sop) {
          var li = document.createElement("li");
          li.textContent = sop.title + " — " + sopSteps(sop) + " steps";
          ol.appendChild(li);
        });
        cover.appendChild(ol);
        var note = document.createElement("p");
        note.textContent = "General caregiving information, not medical advice. Amateur caregivers work alongside the medical and hospice team caring for your person; their guidance for that individual always comes first. If anything causes pain, or you see new bleeding, broken skin, or anything that worries you, stop and call the care team. Nothing in this binder covers swallowing difficulties — if the person in your care coughs, chokes, or struggles to swallow, ask the care team to guide you in person.";
        cover.appendChild(note);
        wrap.appendChild(cover);

        SOP_LIBRARY.forEach(function (sop) {
          var doc = document.createElement("div");
          doc.className = "binder-doc";
          var t = document.createElement("h2");
          t.textContent = sop.title;
          doc.appendChild(t);
          var intro = document.createElement("p");
          intro.textContent = sop.intro;
          doc.appendChild(intro);
          sop.sections.forEach(function (section, si) {
            var sh = document.createElement("h3");
            sh.textContent = (si + 1) + ". " + section.title;
            doc.appendChild(sh);
            var ul = document.createElement("ul");
            section.items.forEach(function (item) {
              var li = document.createElement("li");
              var box = document.createElement("span");
              box.className = "pbox";
              li.appendChild(box);
              li.appendChild(document.createTextNode(item));
              ul.appendChild(li);
            });
            doc.appendChild(ul);
          });
          wrap.appendChild(doc);
        });
      }

      document.getElementById("print-binder").addEventListener("click", function () {
        buildBinderPrint();
        document.body.classList.add("printing-binder");
        window.print();
      });
      window.addEventListener("afterprint", function () {
        document.body.classList.remove("printing-binder");
        document.body.classList.remove("printing-request");
      });

      /* binder request form — SOP choices */
      var binderList = document.getElementById("binder-sop-list");
      var binderAll = document.getElementById("binder-all");
      SOP_LIBRARY.forEach(function (sop, idx) {
        var li = document.createElement("li");
        var label = document.createElement("label");
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "binder-sop-check";
        cb.value = idx;
        cb.disabled = true;
        var span = document.createElement("span");
        span.textContent = sop.title;
        label.appendChild(cb);
        label.appendChild(span);
        li.appendChild(label);
        binderList.appendChild(li);
      });
      binderAll.addEventListener("change", function () {
        var checks = binderList.querySelectorAll(".binder-sop-check");
        checks.forEach(function (c) { c.disabled = binderAll.checked; });
        binderList.classList.toggle("off", binderAll.checked);
      });

      var lastBinderText = "";
      document.getElementById("binder-form").addEventListener("submit", function (ev) {
        ev.preventDefault();
        var formEl = ev.target;
        var name = document.getElementById("binder-name").value.trim();
        var street = document.getElementById("binder-street").value.trim();
        var city = document.getElementById("binder-city").value.trim();
        var state = document.getElementById("binder-state").value.trim();
        var zip = document.getElementById("binder-zip").value.trim();
        var notes = document.getElementById("binder-notes").value.trim();
        if (!name || !street || !city || !state || !zip) return;
        var chosen = [];
        if (binderAll.checked) {
          SOP_LIBRARY.forEach(function (sop) { chosen.push(sop.title); });
        } else {
          binderList.querySelectorAll(".binder-sop-check").forEach(function (c) {
            if (c.checked) chosen.push(SOP_LIBRARY[parseInt(c.value, 10)].title);
          });
        }
        var err = document.getElementById("binder-error");
        if (!chosen.length) { err.classList.add("show"); return; }
        err.classList.remove("show");
        document.getElementById("binder-sops-field").value = binderAll.checked ? "The complete binder — all 10 SOPs: " + chosen.join("; ") : chosen.join("; ");
        document.getElementById("binder-address-field").value = street + ", " + city + ", " + state + " " + zip;

        sendViaWeb3Forms(formEl, document.getElementById("binder-status"), document.getElementById("binder-submit"), "Sending…", function () {
          document.getElementById("br-name").textContent = name;
          document.getElementById("br-address").textContent = street + ", " + city + ", " + state + " " + zip;
          var ul = document.getElementById("br-sops");
          ul.innerHTML = "";
          chosen.forEach(function (title) {
            var li = document.createElement("li");
            li.textContent = title;
            ul.appendChild(li);
          });
          var notesWrap = document.getElementById("br-notes-wrap");
          if (notes) { document.getElementById("br-notes").textContent = notes; notesWrap.style.display = ""; } else { notesWrap.style.display = "none"; }
          document.getElementById("binder-out").classList.add("show");

          lastBinderText =
            "SOCIETY OF AMATEUR CAREGIVERS\n" +
            "Printed SOP Binder Request — SENT\n\n" +
            "Name: " + name + "\n" +
            "Mailing address:\n" +
            street + "\n" +
            city + ", " + state + " " + zip + "\n\n" +
            "Binder requested:\n" +
            chosen.map(function (t) { return "- " + t; }).join("\n") + "\n" +
            (notes ? "\nNotes: " + notes + "\n" : "") +
            "\nYour request has been sent to the Society. Please allow up to two weeks\n" +
            "for printing and postage. A printed binder is mailed free on request. A\n" +
            "donation toward printing and postage is optional and never required.";

          var rp = document.getElementById("request-print");
          rp.innerHTML = "";
          var rh = document.createElement("h2");
          rh.textContent = "Printed SOP Binder Request — Confirmation";
          rp.appendChild(rh);
          var rorg = document.createElement("p");
          rorg.textContent = "Society of Amateur Caregivers — your request has been sent. Please allow up to two weeks for printing and postage.";
          rp.appendChild(rorg);
          var rn = document.createElement("p");
          rn.textContent = "Name: " + name;
          rp.appendChild(rn);
          var ra = document.createElement("p");
          ra.textContent = "Mailing address: " + street + ", " + city + ", " + state + " " + zip;
          rp.appendChild(ra);
          var rs = document.createElement("p");
          rs.textContent = "Binder requested:";
          rp.appendChild(rs);
          var rul = document.createElement("ul");
          chosen.forEach(function (title) {
            var li = document.createElement("li");
            li.textContent = title;
            rul.appendChild(li);
          });
          rp.appendChild(rul);
          if (notes) {
            var rnotes = document.createElement("p");
            rnotes.textContent = "Notes: " + notes;
            rp.appendChild(rnotes);
          }
          var rnote = document.createElement("p");
          rnote.textContent = "A printed binder is mailed free on request. A donation toward printing and postage is optional and never required.";
          rp.appendChild(rnote);

          document.getElementById("binder-out").scrollIntoView({ behavior: "smooth", block: "center" });
        });
      });
      document.getElementById("print-binder-request").addEventListener("click", function () {
        if (!lastBinderText) return;
        document.body.classList.add("printing-request");
        window.print();
      });
      document.getElementById("download-binder").addEventListener("click", function () {
        if (lastBinderText) downloadText("printed-sop-binder-request.txt", lastBinderText);
      });
      document.getElementById("copy-binder").addEventListener("click", function () {
        if (lastBinderText) copyText(lastBinderText, document.getElementById("binder-copied"), "Request copied.");
      });

      /* ============ membership pledge card ============ */
      var lastCardText = "";
      document.getElementById("pledge-form").addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = document.getElementById("member-name").value.trim();
        if (!name) return;
        document.getElementById("mc-name").textContent = name;
        document.getElementById("mc-meta").textContent = "Member in good standing · Free membership";
        document.getElementById("card-out").classList.add("show");
        lastCardText =
          "SOCIETY OF AMATEUR CAREGIVERS\n" +
          "Membership card\n\n" +
          "Name: " + name + "\n" +
          "Standing: Member in good standing\n" +
          "Membership: Free — open to everyone\n\n" +
          "Pledge: I will show up. I will keep the person in my care clean, comfortable, and\n" +
          "treated with dignity. I will work alongside their medical and hospice team, and I\n" +
          "will pass what I learn on to the next caregiver.";
        document.getElementById("card-out").scrollIntoView({ behavior: "smooth", block: "center" });
      });
      document.getElementById("download-card").addEventListener("click", function () {
        if (lastCardText) downloadText("sac-membership-card.txt", lastCardText);
      });
      document.getElementById("copy-card").addEventListener("click", function () {
        if (lastCardText) copyText(lastCardText, document.getElementById("card-copied"), "Card copied.");
      });

      /* ============ support line talk request ============ */
      var lastTalkText = "";
      document.getElementById("talk-form").addEventListener("submit", function (ev) {
        ev.preventDefault();
        var formEl = ev.target;
        var name = document.getElementById("talk-name").value.trim();
        var dateVal = document.getElementById("talk-date").value;
        var timeVal = document.getElementById("talk-time").value;
        var lengthVal = document.getElementById("talk-length").value;
        var topicVal = document.getElementById("talk-topic").value;
        var contactVal = document.getElementById("talk-contact").value.trim();
        var notesVal = document.getElementById("talk-notes").value.trim();
        if (!name || !dateVal || !contactVal) return;
        var dateNice = dateVal;
        try {
          dateNice = new Date(dateVal + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
        } catch (e) {}
        sendViaWeb3Forms(formEl, document.getElementById("talk-status"), document.getElementById("talk-submit"), "Sending…", function () {
          document.getElementById("tc-title").textContent = "A talk for " + name;
          document.getElementById("tc-when").textContent = dateNice + " · " + timeVal + " · " + lengthVal;
          document.getElementById("tc-topic").textContent = "Encouragement wanted: " + topicVal;
          document.getElementById("tc-contact").textContent = "Reach me at: " + contactVal;
          document.getElementById("tc-notes").textContent = notesVal ? "Note: " + notesVal : "";
          document.getElementById("talk-out").classList.add("show");
          lastTalkText =
            "SOCIETY OF AMATEUR CAREGIVERS — SUPPORT LINE\n" +
            "Talk request — SENT (peer support & encouragement — not medical advice, not a crisis line)\n\n" +
            "Name: " + name + "\n" +
            "Contact method: " + contactVal + "\n" +
            "Preferred day: " + dateNice + "\n" +
            "Time window: " + timeVal + "\n" +
            "Length: " + lengthVal + "\n" +
            "Encouragement wanted: " + topicVal + "\n" +
            (notesVal ? "Note: " + notesVal + "\n" : "") +
            "\nWe aim to reply within one day to confirm your talk.\n" +
            "In crisis in the US, call or text 988.";
          document.getElementById("talk-out").scrollIntoView({ behavior: "smooth", block: "center" });
        });
      });
      document.getElementById("download-talk").addEventListener("click", function () {
        if (lastTalkText) downloadText("support-line-talk-request.txt", lastTalkText);
      });
      document.getElementById("copy-talk").addEventListener("click", function () {
        if (lastTalkText) copyText(lastTalkText, document.getElementById("talk-copied"), "Request copied.");
      });

      /* ============ share message ============ */
      var shareMsg = document.getElementById("share-text").textContent.trim();
      document.getElementById("copy-share").addEventListener("click", function () {
        copyText(shareMsg, document.getElementById("share-copied"), "Note copied — now paste it into a text or email to another caregiver.");
      });
    