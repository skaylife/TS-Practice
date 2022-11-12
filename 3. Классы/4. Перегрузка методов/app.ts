
class User {
    skills: string[];

    addSkill(skill: string) : void
    addSkill(skill: string[]) : void
    addSkill(SkillOrSkills: string | string[]): void {
        if(typeof SkillOrSkills == 'string') {
            this.skills.push(SkillOrSkills);
        } else {
            this.skills.concat(SkillOrSkills);
        }
    }
}

// new User().addSkill()
function run(   distances: number): string
function run(   distances: string): number
function run(   distances: number | string): number | string {
    if(typeof distances == 'string') {
        return 1;
    } else {
        return '';
    }
}   

run()