
import sys
import re
import os

scanDir=sys.argv[1]

os.chdir(scanDir)

def syncFolder(root,files):
	root=os.path.relpath(os.path.normcase(os.path.normpath(root)))

	classList=[]

	# for root,dirs,files in os.walk(root):
	# 	if(root==root):
	for file in files:
		if(file.endswith('.ts')):
			className=re.match('(.+)\.ts',file).group(1)
			classList.append((className))
			# break

	if('DataFrame' not in classList):
		return
	classList.remove('DataFrame')

	dataframeFilepath=root+'/DataFrame.ts'

	classOrder=[]
	dataframeContent=''
	exportClass=''
	with open(dataframeFilepath,encoding='UTF-8') as f:
		line=f.readline()
		while(line!='' and line.strip()==''):
			line=f.readline()
			continue
			
		m=re.match('// @export (.+)',line)
		if(not m):
			print(line)
			raise Exception('invalid DataFrame.ts')
		
		exportClass=m.group(1)
		if(exportClass in classList):
			classList.remove(exportClass)

		for declear in f:
			m=re.match('\tpublic [\w_]+:([\w_]+)\.Type=',declear)
			# m=re.match('import ([\w_]+) from ',declear)
			# m=re.match('\s*import\s+([\w_]+)\s+from\s+',declear)
			if(not m):
				continue
			className=m.group(1)
			classOrder.append(className)

		f.seek(0)
		dataframeContent=f.read()
		f.close()

	newClassList=list(set(classOrder) & set(classList))
	newClassList.sort(key=lambda x:classOrder.index(x))
	leftList=list(set(classList) - set(classOrder))
	leftList.sort()
	newClassList.extend(leftList)

	importList=[]
	for className in newClassList:
		importList.append(f"import {className} from './{className}'")
	importLine='\n'.join(importList)

	declearList=[]
	for className in newClassList:
		varName=className[0].lower()+className[1:]
		declearList.append(f"\tpublic {varName}:{className}.Type={className}['testData'] || {className}.value")
	declearLine='\n'.join(declearList)

	template=f'''
// @export {exportClass}
// 这是自动生成的配置脚本

{importLine}\n
export default class DataFrame{{\n
{declearLine}\n
}}\n
'''

	#print(template)
	template=template.lstrip()

	if(template==dataframeContent):
		return

	with open(dataframeFilepath,'w',encoding='UTF-8') as f:
		f.write(template)
		f.close()


def syncRoot(scanDir):
	for root,dirs,files in os.walk(scanDir):
		if('DataFrame.ts' in files):
			syncFolder(root,files)

syncRoot(scanDir)

exit(0)
