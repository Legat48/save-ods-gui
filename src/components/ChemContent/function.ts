import { ChemUnitParsed, ChemAsObject } from './interface';
import { Heat } from '../../zod-scheme/heat';

export function setChemUnits(heat: Heat): ChemUnitParsed[] {
  const arr = new Set<ChemUnitParsed>()
  if (heat['chemical analysises'] && heat['chemical analysises'].length > 0) {
    const lastIndex = heat['chemical analysises'].length - 1
    Object.entries(heat['chemical analysises'][lastIndex]).forEach(([key, value]) => {
      const chemicalKeys = ['Al', 'B', 'C', 'N', 'H', 'Si', 'P', 'S', 'Ca', 'Ti', 'V', 'Cr', 'Mn', 'Ni', 'Cu', 'As', 'Nb', 'Mo', 'Sn', 'Sb', 'W', 'Co', 'Pb'] as const;
      type ChemicalKey = typeof chemicalKeys[any];
      if ((chemicalKeys as readonly string[]).includes(key)) {
        let maxValue = typeof value === 'number' ? value * 1.5 : 0
        let minValue = 0
        if (heat["chemical requirements"][key as ChemicalKey]) {
          const chemicalRequirement = heat["chemical requirements"][key as ChemicalKey];
          if (chemicalRequirement && typeof chemicalRequirement.max === 'number') {
            maxValue = chemicalRequirement.max;

            if (chemicalRequirement && typeof chemicalRequirement.min === 'number') {
              minValue = chemicalRequirement.min;
            }
          }
          const chemUnitParsed = {
            title: key,
            value: typeof value === 'number' ? value : 0,
            max: maxValue,
            min: minValue,
            aim: heat["chemical aim"][key as ChemicalKey] || null
          }
          arr.add(chemUnitParsed)
        }
      }
    })
  }
  return [...arr]
}

export function setChemAsObject(arr: ChemUnitParsed[]): ChemAsObject {
  const chemAsObject: ChemAsObject = {}
  arr.forEach(item => {
    if (item.title) {
      chemAsObject[item.title] = item
    }
  })
  return chemAsObject
}
