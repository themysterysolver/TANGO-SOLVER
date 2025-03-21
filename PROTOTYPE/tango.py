from collections import Counter

result=[]
six=[i for i in range(6)]

def display(grid):
    l=len(grid)
    for i in range(l):
        if i%6==0:
            print()
        print(grid[i],end=" ")
    print('\n---------------------------')

def check_row(grid,idx):
    r=get_row(idx)
    hash=Counter([grid[i] for i in r])
    if hash[1]>3 or hash[2]>3:
        return False
    return True


def check_col(grid,idx):
    c=get_col(idx)
    hash=Counter([grid[i] for i in c])
    if hash[1]>3 or hash[2]>3:
        return False
    return True
    

def get_row(idx):
    n=idx//6
    return [n*6+i for i in six]

def get_col(idx):
    n=idx%6
    return [6*i+n for i in six]

def solver(grid,equal,cross,idx,locked):
    global result
    if idx==36:
        display(grid)
        result=grid[:]
        return
    if grid[idx]==0:
        for i in [1,2]:
            grid[idx]=i

            modified_equal=[]
            if idx in equal:
                for j in equal[idx]:
                    if j not in locked:
                        grid[j]=grid[idx]
                        modified_equal.append(j)

            modified_cross=[]
            if idx in cross:
                for j in cross[idx]:
                    if j not in locked:
                        grid[j]=2 if grid[idx]==1 else 1
                        modified_cross.append(j)

            if check_row(grid,idx) and check_col(grid,idx):
                display(grid)
                solver(grid,equal,cross,idx+1,locked)

            for j in modified_equal:
                if j not in locked:
                    grid[j]=0
            for j in modified_cross:
                if j not in locked:
                    grid[j]=0
            grid[idx]=0
    else:
        if check_row(grid,idx) and check_col(grid,idx):
            display(grid)
            solver(grid,equal,cross,idx+1,locked)
        else:
            if idx not in locked:
                grid[idx]=0
            return

        


if __name__=="__main__":
    '''Board setup'''
    tango=[0,0,0,0,0,0,
            0,0,0,0,0,1,
            0,0,0,0,1,0,
            0,0,0,1,0,2,
            0,0,1,0,1,0,
            0,1,0,1,0,2]
    locked=[i for i in range(36) if tango[i]!=0]
    equal={1:[2,7],6:[7,12]}
    cross={}

    #print(tango)
    #display(tango)
    #print([tango[i] for i in get_row(28)])
    #print([tango[i] for i in get_col(28)])
    
    solver(tango,equal,cross,0,locked)
    print("RESULT:")
    display(result)
